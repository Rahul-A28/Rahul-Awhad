var fs = require("fs");

var files = fs.readdirSync(__dirname);

for(var file of files){
    if(fs.statSync(file).isFile()){
        console.log("FILE:"+file);
    }
    else if(fs.statSync(file).isDirectory()){
        console.log("DIR:"+file);
    }

}