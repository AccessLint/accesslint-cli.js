"use strict";

var Auditor = require("./auditor"),
    Report = require("./report"),
    JsonReport = require("./json_report"),
    util = require("util");

function AuditorCli(args, reportClass) {
  if(args.length == 4) {
    if(args[2] == "--format=json") { this.format = "json"; }
    this.url = args[3];
  } else if(args.length == 3) {
    this.url = args[2];
  } else {
    throw("Usage: node lib/auditor_cli.js URL");
  }

  if(this.format == "json") {
    this.ReportClass = JsonReport;
  } else {
    this.ReportClass = reportClass || Report;
  }
}

AuditorCli.prototype.run = function(auditorClass) {
  var url = this.url;
  var AuditorClass = auditorClass || Auditor;
  var auditor = new AuditorClass(url);
  var ReportClass = this.ReportClass;

  auditor.audit(function(results) {
    var report = new ReportClass(results);

    var reportResults = report.process();

    for(var i = 0; i < reportResults.length; i++) {
      console.log(util.inspect(reportResults[i], false, null));
    }
  }, function(err) {
    // noop
  });
};

module.exports = AuditorCli;
