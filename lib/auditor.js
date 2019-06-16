const { loadPage } = require('axe-puppeteer')
const puppeteer = require('puppeteer')

function Auditor(url, auditScript) {
  this.url = url;
}

Auditor.prototype.audit = async function(callback, errorHandler) {
  const browser = await puppeteer.launch()
  const axeBuilder = await loadPage(
    browser,
    this.url
  )
  const results = await axeBuilder.analyze()

  await browser.close()

  callback(results);
};

module.exports = Auditor;
