#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt",
  file3 = "file3.txt";

// Read 2 files and write to third.
async.auto({
  readFile1:  function (cb) {
    fs.readFile(file1, cb);
  },

  readFile2:  function (cb) {
    fs.readFile(file2, cb);
  },

  writeFile3: ['readFile1', 'readFile2', function (cb, results) {
    var data = results.readFile1.toString() +
               results.readFile2.toString();
    fs.writeFile(file3, data, cb);
  }],

  readFile3:  ['writeFile3', function (cb) {
    fs.readFile(file3, cb);
  }],

  display:    ['readFile3', function (cb, results) {
    console.log(results.readFile3.toString());
  }]
}, function (err) {
  if (err) throw err;
});
