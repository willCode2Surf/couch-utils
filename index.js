"use strict"
var path = require('path')
var cp = require('child_process')
var util = require('./lib/util')
var EE = require('events').EventEmitter

module.exports = CouchUtils

function CouchUtils (attributes) {
  // attributes will contain scaffolding to support module features
  // and will set up a dedicated connection to the specificed couchdb either in the attributes
  // or via config function.
}

CouchUtils.prototype = Object.create(EE.prototype)

CouchUtils.prototype.config = function (attributes) {
  var cfg = attributes;
  this._cfg = cfg;
  return this
}

CouchUtils.prototype.addAttachmentWithRevision = function(id, revision ,filepath, filename, mimeType, cb){
  
  var one = util.oneCallback(cb);
  if(id && revision){

      fs.readFile(filepath, function (err, data) {
        if(err) return one(err);
         
        var attachmentData = { name: filename, 'Content-Type': mimeType, contentLength: data.size, body: data }
        var documentData = { id: id, rev: revision }
        
        this._couchdb.saveAttachment(documentData, attachmentData, function(err, doc){
            if (err) { return one(err); }
            return one(null, doc);
        }); // END saveAttachment
      }); // END readFile
  } // END if
}

CouchUtils.prototype.baseDirectory = function (str) {
  this._basedir = str
  return this
}

function logCommand (args) {
  console.error.apply(null, ['couch-utils'].concat(args))
  return args
}
