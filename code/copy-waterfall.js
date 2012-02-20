#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt";

// Now with waterfall...
async.waterfall([
  function (cb) {
    path.exists(file1, function (exists) {
      cb(exists ? null : new Error("No file!"));
    });
  },
  function (cb) {
    fs.readFile(file1, cb); // Pass cb directly.
  },
  function (data, cb) { // "data" now first arg.
    fs.writeFile(file2, data, cb);
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
