var  matchers = [
  {
    carrier:'ups',
    pattern: /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/gi
  },
  {
    carrier:'fedex',
    pattern: /\b((96\d\d\d\d\d ?\d\d\d\d|96\d\d) ?\d\d\d\d ?d\d\d\d( ?\d\d\d)?)\b/gi
  },
  {
    carrier: 'usps',
    pattern: /\b(9[41]\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d|9[41]\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/gi
  }
];

var scraper = {
  scrape: function() {
    var matches = [];
    var doc = document.body.innerHTML;
    for (var i = 0; i < matchers.length; i++) {
      var match = doc.match(matchers[i].pattern);
      if (match && match.length) {
        matches.push(matchers[i].carrier);
        for (var j = 0; j < match.length; j++) {
          matches.push(match[j]);
        };
     }
    }; 
    return this.sanitize(matches);
  },

  sanitize: function(dirty_array) {
    if(!dirty_array || dirty_array.length <= 0) {
      return ""
    } else {
      var a = dirty_array.map(function(x){return x.replace(/ /g, '').replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'')});
      return a.filter(function(elem, pos) {
        return a.indexOf(elem) == pos;
      });
    }
  },
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("FUCK THIS", request, sender, this)
  if (request.action == "scrape"){
    sendResponse({"data":scraper.scrape()});
  };
});