#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt",
  file3 = "file3.txt";

// Read two files and write to third.
async.auto({
  read1:  function (cb) {
    fs.readFile(file1, cb);
  },

  read2:  function (cb) {
    fs.readFile(file2, cb);
  },

  write3: ['read1', 'read2', function (cb, results) {
    var data = results.read1.toString() +
               results.read2.toString();
    fs.writeFile(file3, data, cb);
  }],

  read3:  ['write3', function (cb) {
    fs.readFile(file3, cb);
  }]
}, function (err, results) {
  if (err) throw err;
  console.log(results.read3.toString());
});
