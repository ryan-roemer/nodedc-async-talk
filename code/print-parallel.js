#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt";

// Parallel.
async.parallel({
  read1: function (cb) {
    fs.readFile(file1, cb);
  },

  read2: function (cb) {
    fs.readFile(file2, cb);
  }
}, function (err, results) {
  if (err) throw err;

  // Our results object with named members.
  console.log(results.read1.toString() +
              results.read2.toString());
});
