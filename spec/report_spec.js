"use strict";
var Report = require("../lib/report");

describe("Report", function() {
  describe("#process", function() {
    describe("Empty raw results", function() {
      it("returns an empty array", function() {
        var url = "http://example.com";
        var emptyFixture = { violations: [] };
        var report = new Report(emptyFixture, url);

        var results = report.process();

        expect(results).toEqual([]);
      });
    });

    describe("with raw results", function() {
      it("returns a flattened representation of the raw results", function() {
        var report = new Report(
            {
              violations: [
              {
                help: "<html> element must have a valid lang attribute",
                impact: "critical",
                nodes: [
                  { target: "html" },
                  { target: "span > a" }
                ]
              }
              ]
            },
            "http://example.com/"
            );

        var results = report.process();

        expect(results).toEqual([
          "http://example.com/ | critical | <html> element must have a valid lang attribute | [\"html\", \"span > a\"]"
        ]);
      });
    });
  });
});
