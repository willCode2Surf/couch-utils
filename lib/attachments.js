"use strict"
var path = require('path');
var tmpdir = require('os').tmpdir();
var fs = require('fs');
var util = require('../lib/util');
var async = require("async");
var request = require("request");


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


