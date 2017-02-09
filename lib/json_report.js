"use strict";

function JsonReport(rawResults) {
  this.rawResults = rawResults;
}

JsonReport.prototype.process = function () {
  return JSON.stringify(this.rawResults);
};

JsonReport.prototype.log = function(results) {
  console.log(results);
};

module.exports = JsonReport;
