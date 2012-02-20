#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt";

function readPrint(file, callback) {
  fs.readFile(file, function (err, data) {
    console.log(data.toString());
    callback(err);
  });
}

// Parallel.
async.parallel([
  async.apply(readPrint, file1),
  async.apply(readPrint, file2)
], function (err) {
  if (err) throw err;
});
