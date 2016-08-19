"use strict";

function MockAuditor(url) {
  this.url = url;
}

MockAuditor.prototype.audit = function(callback, errorHandler) {
  if(this.url === "success_url") {
    callback([]);
  } else {
    errorHandler(new Error("mock auditor error"));
  }
};

module.exports = MockAuditor;
