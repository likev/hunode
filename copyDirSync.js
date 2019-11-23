const fs = require('fs');

let mkdirIfNotExists = (path) => {
        try {
          if (!fs.existsSync(path)) fs.mkdirSync(path);
          fs.accessSync(path, fs.constants.R_OK | fs.constants.W_OK);
          //console.log('can read/write');
        } catch (err) {
          console.error(`no access to ${path}!`);
        }
      }

let copyDirSync = (pathA,pathB)=>{
    mkdirIfNotExists(pathB);
    
    let items = fs.readdirSync(pathA, {withFileTypes:true});

    for(let item of items){
        let pathLeft = pathA + '/' + item.name;
        let pathRight = pathB + '/' + item.name;
        if(item.isFile()) fs.copyFileSync(pathLeft, pathRight);
        else if(item.isDirectory()) copyDirSync(pathLeft, pathRight);
    }
}

//copyDirSync('www', 'posts/www');

module.exports = copyDirSync;

