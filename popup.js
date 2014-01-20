var packageTracker = {
  
  build: function(matches) {
    document.body.appendChild(this.makeList(matches));
  },

  makeList: function(matches) {
    var list = document.createElement('ul');
    if(matches && matches.length > 0) {
      for (var i = 0; i < matches.length; i++) {
        var li = document.createElement('li');
        li.innerHTML=(matches[i]);
        list.appendChild(li);
      }
    } else {
      var alert = document.createElement('li');
      alert.innerHTML = "<h3>No tracking numbers found</h3>";
      list.appendChild(alert);
    }
    return list;
  }
};


document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {action: "scrape"}, function(response) {
      packageTracker.build(response.data)
    });  
  });
});



