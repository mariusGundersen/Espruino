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
    start = start + 7; // skip /*JSON{  //TODO
    let end = contents.indexOf('\n}', start)+2;
    contents = contents.slice(0, start) + transform(contents.substring(start, end)) + contents.slice(end);
  }

  fs.writeFileSync(filename, contents);
}

getWrapperFiles(files => {
  files.forEach(file => {
    processWrapperFile(file, input => {
      const chunk = input.substring(8);
      let json = JSON.parse('{' + chunk);
      if(json.type === 'object'){
        var whitespace = /^(\s*)\S/g.exec(chunk)?.[1];
        if(whitespace === undefined) throw new Error(`${file}: ${input}`);
        return chunk.slice(0, -3) + `,${whitespace}"typedef": "declare var ${json.name}: ${json.instanceof}"` + chunk.slice(-2);
      }
      return input;
    });
  });
});


function getParam(p){
  switch(p){
    case 'bool': return 'boolean';
    case 'int': return 'number';
    case 'int32': return 'number';
    case 'float': return 'number';
    case 'string': return 'string';
    case 'pin': return 'Pin';
    case undefined: return 'void';
    case 'JsVar': return 'any';
    default: return p;
  }
}