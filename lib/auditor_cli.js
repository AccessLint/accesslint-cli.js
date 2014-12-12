"use strict";

var Auditor = require("./auditor"),
    Report = require("./report");

function AuditorCli(args, reportClass) {
  if(args.length !== 3) {
    throw("Usage: node lib/auditor_cli.js URL");
  }

  this.ReportClass = reportClass || Report;
  this.url = args[2];
}

AuditorCli.prototype.run = function(auditorClass) {
  var url = this.url;
  var AuditorClass = auditorClass || Auditor;
  var auditor = new AuditorClass(url);
  var ReportClass = this.ReportClass;

  auditor.audit(function(results) {
    var report = new ReportClass(results);
    console.log(report.process());
  }, function() {
    console.log("Failed to load the page at " + url + ".");
  });
};

module.exports = AuditorCli;
