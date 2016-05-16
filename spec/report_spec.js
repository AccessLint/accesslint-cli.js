"use strict";
var Report = require("../lib/report");

describe("Report", function() {
  describe("#process", function() {
    describe("Empty raw results", function() {
      it("returns an empty array", function() {
        var emptyFixture = { url: "http://example.com", violations: [] };
        var report = new Report(emptyFixture);

        var results = report.process();

        expect(results).toEqual({ url: "http://example.com", warnings: [] });
      });
    });

    describe("with raw results", function() {
      it("returns a flattened representation of the raw results", function() {
        var report = new Report(
            {
              url: "http://example.com",
              violations: [
              {
                help: "lang",
                impact: "critical",
                nodes: [
                  { target: "" }
                ]
              }
              ]
            }
            );

        var results = report.process();

        expect(results).toEqual({
          url: "http://example.com",
          warnings: [{
            description: "lang",
            impact: "critical",
            targets: [""]
          }]
        });
      });
    });
  });
});
