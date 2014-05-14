"use strict"
var path = require('path');
var tmpdir = require('os').tmpdir();
var fs = require('fs');
var util = require('../lib/util');
var async = require("async");
var request = require("request");
var couch = require("cradle");


var globalConfig = false;

exports.getDatabase = function(conn, db, cb){
  var one = util.oneCallback(cb)
  var db = conn.database(db);
  return one(null, db);
  
}

exports.databaseExists = function(db, cb){
	var one = util.oneCallback(cb);
	db.exists(function(err, results){
		if(err) { 
			console.log('error', err);
			return one(err);
		}
		else if(exists) {
			return one(null, true);
		}
		else {
			return one(null, false);
		}
	});
}


exports.createDatabase(conn, dbname, cb) {
	
    var one = util.oneCallback(cb)
    var db = conn.database(db);
	databaseExists(db, function(err, results){
		if(err){
			console.log('error', err);
			return one(err);
		}
		
		if(results){
			return one('database already exists, cannot create');
		}
		else
		{
			// no database, create a new one and return the results
			db.create(function(err, results){
				if(err) {
					console.log('error', err);
					return one(err);
				}
				console.log('success', 'created new database:' + dbname);
				return one(null, results);
			});
		}
	});
}


exports.destroyDatabase = function(db, cb) {
	
    var one = util.oneCallback(cb)
	databaseExists(db, function(err, results){
		if(err){
			console.log('error', err);
			return one(err);
		}
		
		if(results){
			db.destroy(function(err, results){
				if(err){
					console.log('error', err);
					return one(err);
				}
				return one(null, results);
			});
		}
		else {
			return one('database does not exists. cannot destroy');
		}
	});
}

exports.getDefaultConnection = function(cb) {
	var one = util.oneCallback(cb);
	var conn = new(couch.Connection);
	return one(null, conn);
}

exports.getStandardConnection = function(server, port, cb) {
	var one = util.oneCallback(cb);
	var conn = new(couch.Connection)(server,port, {
		cache: true,
		raw: false,
		forceSave: true
	});
	return one(null, conn);
}

exports.setGlobalConfig = function(config, cb) {
	var one = util.oneCallback(cb);
	if(!config){
		return one("missing global config parameter");
	}
	if(!config.host || ! config.port){
		return one("missing host and port config settings")
	}
	couch.setup({
		host: config.host,
		port: config.port,
		cache: true,
		raw: false,
		forceSave: true
	});
	globalConfig = true;
	return one(null, globalConfig);
}


