#!/usr/bin/env node

var fs = require('fs'),
  path = require('path'),
  file1 = "file1.txt",
  file2 = "file2.txt";

// Check if file1 exists, write to file2,
// then display new file2 contents.
path.exists(file1, function (exists) {
  if (!exists) throw new Error("No file!");

  fs.readFile(file1, function (err, data) {
    if (err) throw err;

    fs.writeFile(file2, data, function (err) {
      if (err) throw err;

      fs.readFile(file2, function (err, data) {
        if (err) throw err;
        console.log(data.toString());
      });
    });
  });
});
