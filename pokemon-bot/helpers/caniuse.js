class Caniuse {

  constructor(data) {
    this.data = data;
  }

  supportedBrowsers() {
    let supportedBrowsers = [];

    for (var browserKey in this.data) {
      if (this.data.hasOwnProperty(browserKey)) {
        for (var support in this.data[browserKey]) {
          if (this.data[browserKey].hasOwnProperty(support)) {
            if (support === 'y' ){
              let supportBrowserObject = {}
              supportBrowserObject[browserKey] = this.data[browserKey][support];
              supportedBrowsers.push(supportBrowserObject);
            }
          }
        }
      }
    }
    return supportedBrowsers;
  }

  browserSupport(browserName, browserKey) {
    let prettyMessage = '';
    this.supportedBrowsers().forEach(function(browser){
      if (browser.hasOwnProperty(browserKey)) {
        prettyMessage =  `${browserName} > ${browser[browserKey]} :white_check_mark:`;
      }
    });
    return prettyMessage;
  }

  ie() {
    return this.browserSupport('IE', 'ie');
  }

  edge() {
    return this.browserSupport('Edge', 'edge');
  }

  chromeAndroid(){
    return this.browserSupport('Chrome Android', 'and_chr');
  }

  safari() {
    return this.browserSupport('Safari', 'safari');
  }

  opera() {
    return this.browserSupport('Opera', 'opera');
  }

  safariIos(){
    return this.browserSupport('Safari iOS', 'ios_saf');
  }

  firefox(){
    return this.browserSupport('Firefox', 'firefox');
  }

  chrome(){
    return this.browserSupport('Chrome', 'chrome');
  }
} // end of class

module.exports = Caniuse;
