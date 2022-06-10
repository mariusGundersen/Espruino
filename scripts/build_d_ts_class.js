#!/usr/bin/node
const fs = require('fs');
const path = require('path');

/// Get any files that we think might contain 'JSON' tags
function getWrapperFiles(callback) {
  var BASEDIR = path.resolve(__dirname, "..");
  require('child_process').exec("find "+BASEDIR+" -name jswrap*.c", function(error, stdout, stderr) {
    callback(stdout.toString().trim().split("\n"));
  });
}


/// Extract the /*JSON ... */ comments from a file and parse them
function processWrapperFile(filename, transform) {
  var contents = fs.readFileSync(filename).toString()+"";

  let start = 0;
  while((start = contents.indexOf('/*JSON{  //TODO', start)) > -1){
    start = start + 15; // skip /*JSON{  //TODO
    let end = contents.indexOf('\n}', start)+2;
    contents = contents.slice(0, start) + transform(contents.substring(start, end)) + contents.slice(end);
  }

  fs.writeFileSync(filename, contents);
}

getWrapperFiles(files => {
  files.forEach(file => {
    processWrapperFile(file, chunk => {
      let json = JSON.parse('{' + chunk);
      if(json.type === 'class'){
        var whitespace = /^(\s+)\S/g.exec(chunk)[1];
        return "-CLASS"+chunk.slice(0, -3) + `,${whitespace}"typedef": "class ${json.class}"` + chunk.slice(-2);
      }
      return chunk;
    });
  });
});


function getParam(p){
  switch(p){
    case 'bool': return 'boolean';
    case 'int': return 'number';
    case 'float': return 'number';
    case 'string': return 'string';
    default: return 'any';
  }
}