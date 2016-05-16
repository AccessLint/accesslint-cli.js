window.AccessLint = {};
window.axe = {
  a11yCheck: function(target, options, callback) {
    window.AccessLint.results = ["mock results"];
    callback(window.AccessLint.results);
  }
};
