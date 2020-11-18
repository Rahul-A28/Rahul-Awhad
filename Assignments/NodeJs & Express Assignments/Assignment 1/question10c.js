if(process.argv.length>=4){

    var args = process.argv.slice(2);
    var name1 = args[0];
    var text = args[1];

    var fs = require('fs');

    fs.writeFileSync(name1,text);
    console.log("The file was saved!");
    var filecontent = fs.readFileSync(name1,"utf8");
    console.log(filecontent);
}    