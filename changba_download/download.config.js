let path = require("path");

let config = {
    authorID: '6Pz0620VUg4SlPXhZ6efQg',
    authorName: '',
    downloadInterval: 3 * 1000,
    musicDir: path.join(__dirname, 'music/'),
    videoDir: path.join(__dirname, 'video/'),
    baseUrl: 'http://changba.com',
    listUrl: "/member/personcenter/loadmore.php",
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36' }
};

module.exports = config