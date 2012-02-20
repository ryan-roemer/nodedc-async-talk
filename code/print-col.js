#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  file1 = "file1.txt",
  file2 = "file2.txt";

function readPrint(file, callback) {
  fs.readFile(file, function (err, data) {
    console.log(data.toString());
    callback(err, file);
  });
}

// Collection "forEach" iteration.
async.forEach([file1, file2], readPrint, function (err) {
  if (err) throw err;
});

// Mapped collection (also aggregates returned result).
async.map([file1, file2], readPrint, function (err, results) {
  if (err) throw err;
  console.log("File names: " + results);
});
