#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt",
  readData; // Chained data object.

async.series([
  function (cb) {
    path.exists(file1, function (exists) {
      cb(exists ? null : new Error("No file!"));
    });
  },
  function (cb) {
    fs.readFile(file1, function (err, data) {
      readData = data;
      cb(err);
    });
  },
  function (cb) {
    fs.writeFile(file2, readData, cb);
  },
  function (cb) {
    fs.readFile(file2, function (err, data) {
      if (!err) console.log(data.toString());
      cb(err);
    });
  }
], function (err) {
  if (err) throw err;
});
