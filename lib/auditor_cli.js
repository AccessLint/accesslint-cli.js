var Auditor = require("./auditor"),
    Report = require("./report");

function AuditorCli(args, reportClass) {
  if(args.length !== 3) {
    throw("Usage: node lib/auditor_cli.js URL");
  }

  this.reportClass = reportClass || Report;
  this.url = args[2];
}

AuditorCli.prototype.run = function(auditorClass) {
  auditorClass = auditorClass || Auditor;

  var url = this.url;
  var auditor = new auditorClass(url);
  var reportClass = this.reportClass;

  auditor.audit(function(results) {
    var report = new reportClass(results);
    console.log(report.process());
  }, function() {
    console.log("Failed to load the page at " + url + ".");
  });
};

module.exports = AuditorCli;
