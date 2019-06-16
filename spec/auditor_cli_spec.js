"use strict";

var AuditorCli = require("./../lib/auditor_cli"),
    MockAuditor = require("./support/mock_auditor"),
    MockReport = require("./support/mock_report");

describe("AuditorCli", function() {
  describe("Constructor", function() {
    it("fails with no arguments", function() {
      expect(function() {
        new AuditorCli([]);
      }).toThrow("Usage: node lib/auditor_cli.js URL");
    });

    it("stores the 3rd argument as the url", function() {
      var cli = new AuditorCli(["node", "some_script", "my_url"]);

      expect(cli.url).toEqual("my_url");
    });
  });

  describe("run", function() {
    it("prints report", function() {
      spyOn(console, "log");
      var cli = new AuditorCli(
        ["node", "some_script", "success_url"],
        MockReport
      );

      cli.run(MockAuditor);

      expect(console.log).toHaveBeenCalledWith("\"processed data\"");
    });
  });
});
