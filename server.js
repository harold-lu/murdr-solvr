

const express = require('express');
const busboy = require('connect-busboy'); //middleware for form/file upload
const path = require('path');     //used for file path
const fs = require('fs-extra');       //File System - for file manipulation
const mime = require('mime');

// var myPythonScriptPath = 'newfile.py';
//
// // Use python shell
// let { PythonShell } = require("python-shell");
// var pyshell = new PythonShell(myPythonScriptPath);
const spawn = require("child_process").spawn;

let app = express();
app.use(express.urlencoded({extended: true}));
app.use(busboy());
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(__dirname, {index: 'index.html'}))

app.get('/makeExcel', makeExcel);
app.post('/upload', uploadFile);
app.get('/download', download);

let fileName = '';

// function download(req, res, next){
//   console.log("downloading . . .");
//   fileName = fileName.slice(0,-5);
//   fileName = fileName + ".csv"
//   console.log(fileName);
//   //res.download(__dirname + "/"+fileName, fileName);
//   res.download("./"+fileName, "file.csv");
// }

function download(req, res, next){
  fileName = fileName.slice(0,-5);
  fileName =  __dirname + '/' + fileName + ".csv"
  let part1 = 'file:///C:/Users/harol/OneDrive/Desktop/REACT/';
  let part2 = encodeURI('Murder on the 2nd Floor');
  let part3 = 'Murder-on-the-2nd-Floor-Raw-Data-v01.csv'
  let build = part1 + part2 + '/' + part2 + '/' + part3;

  //
  //
  //
  // var file = path.basename(fileName);
  // var mimetype = mime.lookup(file);
  //
  // res.setHeader('Content-disposition', 'attachment; filename=' + file);
  // res.setHeader('Content-type', mimetype);
  //
  // var filestream = fs.createReadStream(fileName);
  // filestream.pipe(res);
  //fileName = encodeURI(fileName);
  res.send(build);
};

function uploadFile(req, res, next){
  console.log("function begin");
  var fstream;
  req.pipe(req.busboy);
  console.log("does this work?");
  req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype){
    console.log("Uploading: " + filename);

    fileName = filename;
    console.log(fileName)
    fstream = fs.createWriteStream(__dirname + "/aaa.pdf");
    file.pipe(fstream);
    fstream.on('close', function(){
      console.log("Upload finished of " + filename);
      res.sendFile(__dirname + "/page2.html")
    })
  })
}

// function sendIndex(req, res, next){
//   res.sendFile(__dirname + '/ui.html');
// }
function makeExcel(req, res, next){
  // pyshell.on('message', function(message){
  //   console.log(message);
  // })
  // pyshell.end(function(err){
  //   if(err){
  //     throw err;
  //   }
  // })


//   console.log(fileName);
//   var options = {
//     mode: 'text',
//     args: ["Murder-on-the-2nd-Floor-Raw-Data-v01.json"]
//   };
//   console.log("calling this function");
//   PythonShell.run("newfile.py", options, function(err) {
//   if (err) throw err;
//   console.log("finished");
// });
  const pythonProcess = spawn('python', [__dirname + '/newfile.py', fileName]);


}


app.listen(3000, function(){
  console.log('server running on port 3000');
})
