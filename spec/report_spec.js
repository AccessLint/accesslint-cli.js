var Report = require("../lib/report");

describe("Report", function() {
  describe("#process", function() {
    describe("Empty raw results", function() {
      it("returns an empty array", function() {
        var emptyFixture = [];
        var report = new Report(emptyFixture);

        var results = report.process();

        expect(results).toEqual([]);
      });
    });

    describe("with raw results", function() {
      it("returns a flattened representation of the raw results", function() {
        var report = new Report([
          {
            "result": "no elements result",
            "rule": {
              "heading": "heading 1",
              "severity": "quite severe"
            }
          }, {
            "result": "result with elements",
            "elements": [{ outerHTML: "<a>ohai</a>" }, null],
            "rule": { "heading": "heading 2", "severity": "not so severe!" }
          },
        ]);

        var results = report.process();

        expect(results).toEqual(
          [{
            status: 'no elements result',
            title: 'heading 1',
            severity: 'quite severe',
            element_names: [],
            elements: undefined
          }, {
            status: 'result with elements',
            title: 'heading 2',
            severity: 'not so severe!',
            element_names: ['<a>ohai</a>'],
            elements: [{ outerHTML: '<a>ohai</a>' }, null]
          }]
        );
      });
    });
  });
});
