const fs = require('fs')
const path = require('path')
const http = require('http')
const qs = require('querystring')
const chalk = require('chalk');
const sd = require('silly-datetime');
const shell = require('any-shell-escape')
const { exec } = require('child_process')
const config = require('./download.config')

// 唱吧加密JS （http://res.cdn.changbaimg.com/-/09be85081ab5ba79/crypto-js.js）
const CryptoJS = require('./utils/crypto-js');

/**
 * 解密下载地址(实现：/s/user_work_jplayer_format.js L186-194)
 * @param {String} url 已加密url
 * @returns {String} 下载地址
 * @example
 * commonObj.url = 'zHR3/YkVGH5aFvs2ZxGOyTyKKjM7+qJ6mF6bF64RdcUpb7Bx6uqkikAjkoyLeomQ';  // mp3
 * decryptUrl(commonObj.url)
 * jplayer = {  // mp4
 *   video_url: '/srWsSBeaDLJB9ncZTmlLLLAw3js1r+nG5jK1stoscJQVoY+9Lgue4NhFBcPdOTHjPQl49gqXn0oi5k1waWNdg==',
 *   video_poster: "http://aliimg.changba.com/cache/photo/42698d63-151c-4fdb-b3a1-25788de2015b_640_640.jpg"
 * }
 * decryptUrl(jplayer.video_url)
 */
function decryptUrl(url) {
  let d = "a17fe74e421c2cbf3dc323f4b4f3a1af";
  let b = CryptoJS.enc.Utf8.parse(d.substring(0, 16));
  let a = CryptoJS.enc.Utf8.parse(d.substring(16));

  let result = CryptoJS.AES.decrypt(url, a, {
    'iv': b,
    'padding': CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8)

  if (!/http(s)*/.test(result)) {
    result = decryptUrlVideo(result)
    if(!/http(s)*/.test(result)){
      result = 'http:' + result
    }
  }
  return result
}
/**
 * MV解密下载地址(实现：/s/user_work_jplayer_format.js L563-592)
 * @param {String} _0x589bde 
 */
function decryptUrlVideo(_0x589bde) {
  var _0x161021 = new Array(-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,0x3e,-0x1,-0x1,-0x1,0x3f,0x34,0x35,0x36,0x37,0x38,0x39,0x3a,0x3b,0x3c,0x3d,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7,0x8,0x9,0xa,0xb,0xc,0xd,0xe,0xf,0x10,0x11,0x12,0x13,0x14,0x15,0x16,0x17,0x18,0x19,-0x1,-0x1,-0x1,-0x1,-0x1,-0x1,0x1a,0x1b,0x1c,0x1d,0x1e,0x1f,0x20,0x21,0x22,0x23,0x24,0x25,0x26,0x27,0x28,0x29,0x2a,0x2b,0x2c,0x2d,0x2e,0x2f,0x30,0x31,0x32,0x33,-0x1,-0x1,-0x1,-0x1,-0x1);
  var _0x6c37d5, _0x51a26a, _0x540b4c, _0x56a5c3, _0x205293, _0x2fd3b6, _0xa9d9c2;
  for (_0x2fd3b6 = _0x589bde['length'], _0x205293 = 0x0, _0xa9d9c2 = ''; _0x205293 < _0x2fd3b6; ) {
      do {
          _0x6c37d5 = _0x161021[0xff & _0x589bde['charCodeAt'](_0x205293++)];
      } while (_0x205293 < _0x2fd3b6 && -0x1 == _0x6c37d5);if (-0x1 == _0x6c37d5)
          break;
      do {
          _0x51a26a = _0x161021[0xff & _0x589bde['charCodeAt'](_0x205293++)];
      } while (_0x205293 < _0x2fd3b6 && -0x1 == _0x51a26a);if (-0x1 == _0x51a26a)
          break;
      _0xa9d9c2 += String['fromCharCode'](_0x6c37d5 << 0x2 | (0x30 & _0x51a26a) >> 0x4);
      do {
          if (0x3d == (_0x540b4c = 0xff & _0x589bde['charCodeAt'](_0x205293++)))
              return _0xa9d9c2;
          _0x540b4c = _0x161021[_0x540b4c];
      } while (_0x205293 < _0x2fd3b6 && -0x1 == _0x540b4c);if (-0x1 == _0x540b4c)
          break;
      _0xa9d9c2 += String['fromCharCode']((0xf & _0x51a26a) << 0x4 | (0x3c & _0x540b4c) >> 0x2);
      do {
          if (0x3d == (_0x56a5c3 = 0xff & _0x589bde['charCodeAt'](_0x205293++)))
              return _0xa9d9c2;
          _0x56a5c3 = _0x161021[_0x56a5c3];
      } while (_0x205293 < _0x2fd3b6 && -0x1 == _0x56a5c3);if (-0x1 == _0x56a5c3)
          break;
      _0xa9d9c2 += String['fromCharCode']((0x3 & _0x540b4c) << 0x6 | _0x56a5c3);
  }
  return _0xa9d9c2;
}
/**
 * 唱吧中的作品简要信息
 * wordId 对用户的作品唯一ID
 * songName 作品名
 * href 作品网页链接
 */
class Song {
  workId;
  songName;
  href;
  constructor(workId, songName, href) {
    this.workId = workId;
    this.songName = songName;
    this.href = href;
  }
}

/**
 * 获取作品页面地址
 * @param {Array<Song>} list 存储作品的信息的一个数组
 * @param {Number} page 作品主页中从第几页开始爬取 0 开始
 * @param {Number} endPage 作品主页爬取到第几页(包含)
 * @returns {Promise<Array<Song>>}
 */
function getList(list, page, endPage) {
  if (!config.authorID) {
    console.log(chalk.red.underline('\nconfig.authorID is undefined\n'))
    return list
  }
  if (endPage == undefined) endPage = 99
  return new Promise((resolve, reject) => {
    const params = {
      ver: 1,
      type: 0,
      curuserid: -1,
      userid: config.authorID,
      pageNum: page
    }
    const paramStr = qs.stringify(params);
    const url = `${config.baseUrl}${config.listUrl}?${paramStr}`;
    console.log(chalk.green(url))
    http.get(url, { headers: config.headers }, function (res) {
      let data = ''
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', async function () {
        let dlist = JSON.parse(data)
        dlist.map(val => {
          list.push(new Song(val.workid, val.songname, '/s/' + val.enworkid))
        })
        // 通过一页是否满20个作品判断是否还有下一页
        if (dlist.length === 20 && page !== endPage) {
          const r = await getList(list, ++page);
          resolve(r)
        } else {
          resolve(list);
        }
      });
      res.on('error', function (err) {
        writeLog(`获取列表失败：${url} => ${err.message}`)
        reject(new Error('获取更多失败!'))
      })
    })
  })
}
/**
 * 获取list中作品的静态页面HTML
 * @param {Array<Song>} list 
 * @returns {void}
 */
function download(list) {
  if (list.length === 0) {
    return
  }
  downloadSong(list[0])
  let curIdx = 1
  let timer = setInterval(async () => {
    if (curIdx === list.length) {
      timer && clearInterval(timer), timer = null
      return
    }
    const song = list[curIdx]
    await downloadSong(song)
    curIdx++
  }, config.downloadInterval)
}
/**
 * 获取作品的静态页面HTML
 * @param {Song} song 
 * @returns {Promise<void>}
 */
function downloadSong(song) {
  return new Promise(async resolve => {
    let url = `${config.baseUrl}${song.href}`;
    let htmlContent = await downloadHtml(url).catch(() => '');
    if (htmlContent === '') {
      writeLog(`${song.songName}下载失败HTML：${url} => 歌曲可能已被删除`)
      resolve()
      return
    }
    let downloadUrl = getDownloadUrlFromHtml(htmlContent)
    if (downloadUrl === '') {
      writeLog(`${song.songName}获取下载地址失败：${url}`)
      resolve()
      return
    }
    fs.appendFile(path.join(__dirname, '/temp/downloadlist.txt'), `{ name: '${song.songName}', url: '${downloadUrl}'}\n`, { flag: 'a' }, () => { })
    downloadFile(downloadUrl, song.songName)
    resolve()
  })
}
/**
 * 通过url获取HTML
 * @param {String} url HTML页面地址
 * @returns {Promise<String>}
 */
function downloadHtml(url) {
  return new Promise((resolve, reject) => {
    http.get(url, { headers: config.headers }, function (res) {
      let data = ''
      res.on("data", function (chunk) {
        data += String(chunk)
      })
      res.on("end", function () {
        resolve(data);
      })
      res.on("error", err => {
        reject(err);
      })
    })
  })
}
/**
 * 通过Html解析出作品的下载地址
 * @param {String} html HTML页面
 * @returns {String} downloadUrl
 */
function getDownloadUrlFromHtml(html) {
  let downloadUrl = ''
  const musicReg = /commonObj\.url\s*=\s*'(.+)';/
  const playReg = /video_url:\s*'(.+)',/
  let result = html.match(musicReg)
  if (result) {
    downloadUrl = result[1]
  } else {
    result = html.match(playReg)
    result && (downloadUrl = result[1])
  }
  if (downloadUrl) {
    downloadUrl = decryptUrl(downloadUrl)
  }
  return downloadUrl
}
/**
 * 下载作品存储到本地
 * @param {String} url 作品下载地址
 * @param {String} songName 作品名
 * @returns {void}
 */
function downloadFile(url, songName) {
  const ext = url.replace(/.+\.(.+)$/, '$1')
  const fullName = songName + '.' + ext
  let filePath = ''
  if (ext === 'mp3') {
    if (!fs.existsSync(config.musicDir)) {
      fs.mkdirSync(config.musicDir)
    }
    filePath = path.join(config.musicDir, fullName)
  } else {
    if (!fs.existsSync(config.videoDir)) {
      fs.mkdirSync(config.videoDir)
    }
    filePath = path.join(config.videoDir, fullName)
  }
  let file = fs.createWriteStream(filePath)
  console.log(`${songName} 下载中...`)
  http.get(url, { headers: config.headers }, (res) => {
    res.on('error', err => {
      console.log(chalk.red(`${songName} 下载失败`))
      writeLog(`${songName}下载失败：${url} => ${err.message}`)
    });
    file.on('finish', () => {
      console.log(chalk.green(`${songName} 下载完成！`))
      setFileMetaData(filePath, songName, ext)
    })
    res.pipe(file)
  })
}

/**
 * 写入作品metadata
 * @param {String} filePath 
 * @param {String} songName 
 * @param {String} ext 扩展名
 * @returns {void}
 */
function setFileMetaData(filePath, songName, ext) {
  const ffmpeg = path.join(__dirname, 'utils', 'ffmpeg.exe')
  if(!fs.existsSync(ffmpeg)){
    console.log(chalk.red('/utils/ffmpeg.exe 文件不存在'))
    console.log(chalk.red('下载地址：') + chalk.blue('https://github.com/ShareX/FFmpeg/releases/download/v4.3.1/ffmpeg-4.3.1-win64.zip'))
    return
  }
  const metadata = {
    title: songName,
    artist: config.authorName || ''
  }
  let metaShellList = []
  Object.keys(metadata).forEach(key => {
    metaShellList.push('-metadata')
    metaShellList.push(`${key}=${metadata[key]}`)
  });
  const tempFile = path.join(__dirname, `/tempFile.${ext}`)
  fs.copyFileSync(filePath, tempFile)
  const make = shell([
    ffmpeg, '-y', '-v', 'error',
    '-i', tempFile,
    '-acodec', 'copy',
    '-vcodec', 'copy',
    ...metaShellList,
    filePath
  ])
  exec(make, (err) => {
    if (err) {
      writeLog(`${songName}写入metadata失败：${err.message}`)
    }
    fs.unlink(tempFile, () => { })
  })
}
/**
 * 写入日志
 * @param {Array<Song>} list 
 * @returns {void}
 */
function writeUrlList(list) {
  const fileDir = path.join(__dirname, '/temp/');
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }
  const jsonPath = path.join(__dirname, '/temp/urllist.json');
  fs.writeFile(jsonPath, JSON.stringify(list), (err) => {
    if (!!err) {
      writeLog('\n' + err.message)
    }
  })
}
/**
 * 写入日志
 * @param {String} msg 
 * @returns
 */
function writeLog(msg) {
  const fileDir = path.join(__dirname, '/temp/');
  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }
  const logPath = path.join(__dirname, '/temp/log.txt');
  const logTime = `[${sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss')}]\t`
  fs.appendFile(logPath, logTime + msg + '\n', { flag: 'a' }, () => { })
}

/**
 * 开始批量下载作品
 */
async function start() {
  const musicList = await getList([], 0)  // 下载全部作品
  writeUrlList(musicList)
  download(musicList)
}
// start();

/**
 * 下载单个作品
 * @param {String} url 作品页面地址
 * @param {String} songName 作品名
 * @returns {void}
 */
async function downloadSong(url, songName) {
  const html = await downloadHtml(url).catch(() => '')
  if (!html) {
    console.log(chalk.red(`<<${songName}>>HTML下载失败, 可能作品已被删除`))
    return
  }
  const downloadUrl = getDownloadUrlFromHtml(html)
  downloadUrl && downloadFile(downloadUrl, songName)
}
// eg
downloadSong('http://changba.com/s/PBZkNLjjPmuE_nW7EuUNpg?&cbcode=Kxhsv6044ik', '余味')