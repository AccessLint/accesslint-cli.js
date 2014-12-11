"use strict";

function Report(rawResults) {
  this.rawResults = rawResults;
}

Report.prototype.process = function () {
  var results = [];

  for(var i = 0; i < this.rawResults.length; i++) {
    results.push(this._transformResult(this.rawResults[i]));
  }

  return results;
};

Report.prototype._transformResult = function(result) {
  return {
    status: result.result,
    title: result.rule.heading,
    severity: result.rule.severity,
    element_names: this._extractElements(result),
    elements: result.elements
  };
};

Report.prototype._extractElements = function(result) {
  var element_names = [];
  var elements = result.elements;

  if(elements !== undefined) {
    for(var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if(element) {
        element_names.push(element.outerHTML);
      }
    }
  }

  return element_names;
};

module.exports = Report;
