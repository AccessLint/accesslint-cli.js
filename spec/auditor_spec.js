"use strict";

var express = require("express"),
    Auditor = require("./../lib/auditor");

var app = express();

var ERROR = "Page error!";

app.get("/", function(request, response){
  response.send(
    "<html>" +
      "<head></head>" +
      "<body></body>" +
    "</html>"
  );
});

app.get("/errors", function(request, response){
  response.send(
    "<html>" +
      "<head><script>throw new Error('" + ERROR + "');</script></head>" +
      "<body></body>" +
    "</html>"
  );
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
      }, function() {});
    });

    it("propagates JavaScript errors", function(done) {
      var url = "http://127.0.0.1:" + appServer.address().port + "/errors";
      var auditor = new Auditor(url);

      auditor.audit(function() {}, function(err) {
        expect(err).toMatch(ERROR);
        done();
      });
    });
  });
});
