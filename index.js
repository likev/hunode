
const fs = require('fs');
const fsP = require('fs').promises;
const marked = require('marked');
const yaml = require('js-yaml');
const moment = require('moment');

const header = require('./themes/default/header.js');
const article = require('./themes/default/article.js');
const footer = require('./themes/default/footer.js');
const archive = require('./themes/default/archive.js');
const home = require('./themes/default/home.js');
const copyDirSync = require('./copyDirSync.js');

let archiveItem = (data) => {

    let updateTimeStr = data.updateTime.format('YYYY年MM月DD日');
    let item = `<li class="post-item">
    <div class="post-info">${updateTimeStr}</div>
    <a href="${data.url}" class="post-title-link">${data.articleTitle}</a>
</li>`;

    return item;
}

let mkdirIfNotExists = (path) => {
    try {
        if (!fs.existsSync(path)) fs.mkdirSync(path);
        fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
        //console.log('can read/write');
    } catch (err) {
        console.error(`no access to ${path}!`);
    }
}

let postPath = 'posts', wwwPath = 'www';

let postArray = [];

let readMdFile = async (dirPath, file) => {
    let urlPath = '/' + file.substring(0, file.length - 3);
    let wwwPostDir = wwwPath + urlPath;
    mkdirIfNotExists(wwwPostDir);

    let content = await fsP.readFile(dirPath + '/' + file, 'utf8');

    let re = /([^\s-]+.+?)^\s*---\s*$/ms;
    let found = content.match(re);

    let posStart = 0;
    let yamlData = {};

    if (found) {
        //console.log(found);
        posStart = found[0].length + found.index;

        try {
            yamlData = yaml.safeLoad(found[1]);
            //console.log(yamlData);       
        } catch (e) {
            console.log(e);
        }

    }

    yamlData.title = yamlData.title || file.substring(0, file.length - 3);
    yamlData.pageTitle = yamlData.title;
    yamlData.articleTitle = yamlData.title;
    yamlData.author = yamlData.author || 'admin';
    yamlData.createTime = yamlData.date ? moment(yamlData.date) : moment();
    yamlData.updateTime = yamlData.update ? moment(yamlData.update) : yamlData.createTime;
    yamlData.crateTimeStr = yamlData.createTime.format('YYYY年MM月DD日 HH时mm分');
    yamlData.updateTimeStr = yamlData.updateTime.format('YYYY年MM月DD日 HH时mm分');

    yamlData.css = yamlData.css || [];
    yamlData.script = yamlData.script || [];
    yamlData.url = encodeURI(urlPath);


    postArray.push(yamlData);

    let articlehtml = marked(content.substring(posStart));

    let html = header(yamlData);
    html += article({ ...yamlData, articleContent: articlehtml });
    html += footer(yamlData);

    await fsP.writeFile(wwwPostDir + '/index.html', html);

    console.log(`${file} complete!`);

    return yamlData;

}

let scanPost = async () => {

    try {
        let postDirList = await fsP.readdir(postPath, { withFileTypes: true });

        //console.log(postDirList);

        mkdirIfNotExists(wwwPath);

        let zondicons = 'zondicons';
        copyDirSync(zondicons, wwwPath + '/' + zondicons);

        for (let post_or_postDir of postDirList) {

            //single post dir
            if (post_or_postDir.isDirectory()) {
                let postDirPath = postPath + '/' + post_or_postDir.name;
                let files = await fsP.readdir(postDirPath, { withFileTypes: true });

                //console.log(files);
                let countMD = 0;
                let postname = '', yamlData = {};

                for (let file_or_dir of files) {
                    let name = file_or_dir.name;
                    if (file_or_dir.isFile() && name.substring(name.length - 3) === '.md') {
                        if (++countMD > 1) break;//read one md first and break;

                        postname = name;
                        yamlData = await readMdFile(postDirPath, name);
                    }
                }

                let urlPath = '/' + postname.substring(0, postname.length - 3);
                let wwwPostDir = wwwPath + urlPath;

                //copy post related files and dirs
                for (let file_or_dir of files) {
                    if (!postname) break; //no post

                    let name = file_or_dir.name;
                    let pathLeft = postDirPath + '/' + name,
                        pathRight = wwwPostDir + '/' + name;

                    if (file_or_dir.isFile() && name.substring(name.length - 3) !== '.md') {
                        fs.copyFileSync(pathLeft, pathRight);
                    } else if (file_or_dir.isDirectory()) {
                        //copy dir and files;
                        copyDirSync(pathLeft, pathRight);
                    }
                }

            } else if (post_or_postDir.isFile()) {//maybe singlepost.md
                let filename = post_or_postDir.name;
                if (filename.substring(filename.length - 3) === '.md') {

                    await readMdFile(postPath, filename);
                }
            }

        }

        postArray.sort((a, b) => b.updateTime.diff(a.updateTime));
        //console.log(postArray);
        let archiveContent = '<ul>', homeContent = '<ul>';
        let homeCount = 0, homeMax = 10;
        for (let post of postArray) {
            archiveContent += archiveItem(post);

            //use archiveItem
            if (++homeCount <= homeMax) homeContent += archiveItem(post);
        }
        archiveContent += '</ul>';
        homeContent += '</ul>';

        //console.log(archiveContent);

        let wwwArchiveDir = wwwPath + '/archive';
        mkdirIfNotExists(wwwArchiveDir);

        let archiveHtml = header({ pageTitle: '文章归档' });
        archiveHtml += archive({ archiveContent });
        archiveHtml += footer({});

        let homeHtml = header({ pageTitle: '主页' });
        homeHtml += home({ homeContent });
        homeHtml += footer({});

        await fsP.writeFile(wwwArchiveDir + '/index.html', archiveHtml);
        await fsP.writeFile(wwwPath + '/index.html', homeHtml);

    } catch (err) {
        console.log(err)
    }

}

scanPost();


