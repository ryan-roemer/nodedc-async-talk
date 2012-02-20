#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt";

var readFile1 = async.apply(fs.readFile, file1),
  writeFile2 = async.apply(fs.writeFile, file2);

// Using "apply" to curry.
async.waterfall([
  function (cb) {
    path.exists(file1, function (exists) {
      cb(exists ? null : new Error("No file!"));
    });
  },
  readFile1,  // Use curried wrapper here.
  writeFile2, // ... and here too.
  function (cb) {
    fs.readFile(file2, function (err, data) {
      if (!err) console.log(data.toString());
      cb(err);
    });
  }
], function (err) {
  if (err) throw err;
});
