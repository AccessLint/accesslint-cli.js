"use strict";

function MockReport(data) {
  this.data = data;
}

MockReport.prototype.process = function() {
  return "processed data";
};

module.exports = MockReport;
