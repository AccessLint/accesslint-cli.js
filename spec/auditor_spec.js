"use strict";

var express = require("express"),
    Auditor = require("./../lib/auditor");

var app = express();

app.get("/", function(request, response){
  response.send(
    "<html>" +
      "<head></head>" +
      "<body></body>" +
    "</html>"
  );
});

app.get("/errors", function(request, response){
  response.status(404).end();
});

var appServer = app.listen();

describe("Auditor", function() {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  describe("audit", function() {
    it("runs injected Audit script and returns its result", function(done) {
      var url = "http://127.0.0.1:" + appServer.address().port + "/";
      var auditor = new Auditor(url);

      auditor.audit(function(results) {
        expect(results.violations).toBeDefined();
        done();
      });
    });
  });
});
