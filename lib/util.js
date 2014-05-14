"use strict"
var path = require('path')
var tmpdir = require('os').tmpdir()
var fs = require('fs')

exports.tmpl = function (tmpl, data) {
  for (var label in data) {
    tmpl = tmpl.replace('{{'+label+'}}', data[label])
  }
  return tmpl
}

var genInc = Date.now()
var genTmpPath = exports.genTmpPath = function () {
  return path.join(tmpdir, 'couchutils-'+(genInc++).toString(14))
}

//CHORE: move low level file system encapsulation to its own lib 
/*
exports.rmParentDir = function (fpath, cb) { rimraf(path.dirname(fpath), cb) }
exports.rmDir       = function (dpath, cb) { rimraf(dpath, cb) }
exports.rmFile      = function (fpath, cb) { fs.unlink(fpath, cb) }
*/http://localhost/AdjusterMapImport/AdjusterMap.asmx?WSDL
exports.writeStream = function (ins, ext, cb) {
  var fpath = genTmpPath()+'.'+ext
  var ws = fs.createWriteStream(fpath)
  var one = exports.oneCallback(cb)

  ins.pipe(ws)
    .on('error', one)
    .on('finish', function () {
      one(null, fpath)
    })
}

// CHORE:  oneCallback and allCallback need to be moved over to utilize ASYNC lib for flow control with a solid queue implementation
exports.oneCallback = function (cb) {
  var called = false
  return function (er, data) {
    if (called) return
    called = true
    cb(er, data)
  }
}

exports.allCallback = function (cb) {
  var one = exports.oneCallback(cb)
  var expect = 0
  var total = 0

  setImmediate(function () { if (expect == 0) one(null, total) })

  return function () {
    expect++, total++
    return function (er) {
      if (er) return one(er)
      if (--expect == 0) one(null, total)
    }
  }
}  //END CHORE// 

exports.guid = function(cb){
  var one = exports.oneCallback(cb)
  function chunker() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return one(null,chunker() + chunker() + '-' + chunker() + '-' + chunker() + '-' +
         chunker() + '-' + chunker() + chunker() + chunker());
  
}


