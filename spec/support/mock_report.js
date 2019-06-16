"use strict";

function MockReport(data) {
  this.data = data;
}

MockReport.prototype.process = function() {
  return ["processed data"];
};

MockReport.prototype.log = function(results) {
  console.log(JSON.stringify(results[0]));
};

module.exports = MockReport;
