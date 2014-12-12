"use strict";

var phantom = require("phantom");

function Auditor(url, auditScript) {
  var defaultAuditScriptPath = __dirname + "/axs_testing.js";

  this.url = url;
  this.auditScript = auditScript || defaultAuditScriptPath;
}

Auditor.prototype.audit = function(callback, errorHandler) {
  var url = this.url;
  var _this = this;

  phantom.create(function (phantom) {
    phantom.createPage(function (page) {
      page.open(url, function (status) {
        if (status === "success") {
          _this._auditPage(page, function(auditResults) {
            callback(auditResults);
            phantom.exit();
          });
        } else {
          errorHandler(status);
          phantom.exit();
        }
      });
    });
  });
};

Auditor.prototype._auditPage = function(page, callback) {
  page.injectJs(this.auditScript);

  page.evaluate(function() {
    return axs.Audit.run();
  }, callback);
};

module.exports = Auditor;
