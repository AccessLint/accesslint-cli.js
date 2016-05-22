"use strict";

var phantom = require("phantom");
var path = require("path");

function Auditor(url, auditScript) {
  var defaultAuditScriptPath = __dirname + "/accesslint.js";
  this.url = url;
  this.auditScript = auditScript || defaultAuditScriptPath;
}

function waitUntil(asyncTest) {
  return new Promise(function(resolve, reject) {
    function wait() {
      asyncTest().then(function(value) {
        if (value) {
          resolve(value);
        } else {
          setTimeout(wait, 100);
        }
      }).catch(function(e) {
        reject();
      });
    }

    wait();
  });
}

Auditor.prototype.audit = function(callback, errorHandler) {
  var url = this.url;
  var _this = this;
  var sitepage = null;
  var phInstance = null;
  var successHandler = callback;

  phantom.create().then(function (instance) {
    phInstance = instance;
    return instance.createPage();
  }).then(function (page) {
    sitepage = page;
    sitepage.property("viewportSize", {
      width: 1200,
      height: 900
    });

    return sitepage.open(url);
  }).then(function (status) {
    return sitepage.property("content");
  }).then(function (content) {
    return sitepage.injectJs(_this.auditScript);
  }).then(function (injected) {
    waitUntil(function() {
      return sitepage.evaluate(function() {
        var run = new Event("accesslint:run");
        window.dispatchEvent(run);
        return window.AccessLint.results;
      });
    }).then(function(results) {
      successHandler(results);
      sitepage.close();
      phInstance.exit();
    });
  }).catch(function (error) {
    console.log(error);
    errorHandler(error);
    phInstance.exit();
  });
};

module.exports = Auditor;
