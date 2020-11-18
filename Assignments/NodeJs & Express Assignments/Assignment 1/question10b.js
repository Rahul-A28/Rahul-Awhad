if(process.argv.length>=4){

    var args = process.argv.slice(2);
    var name = args[0];
    var text = args[1];

    var fs = require('fs');

    fs.writeFileSync(name,text);
    console.log("The file was saved!");
}    