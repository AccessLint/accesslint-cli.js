"use strict";

function RawReport(rawResults) {
  this.rawResults = rawResults;
}

RawReport.prototype.process = function () {
  var results = [];

  results.push(JSON.stringify(this.rawResults));

  return results;
};

module.exports = RawReport;
