(function() {
  document.addEventListener("DOMContentLoaded", function() {
    if(chrome.tabs) {
      var background = chrome.extension.getBackgroundPage();
      emitEvent("init");
    }else{
      emitEvent("init");
    }

    setTimeout(function(){
      var color = getStorage("color");
      if(color){
        $(".pxg-picker-items").find("input[type=radio]"+"[value="+color+"]").prop("checked", "checked");
        emitEvent("change:guideColor", {"color": color });
      }
    }, 100);
  });

  function emitEvent(event, _options){
    var params = {};
    params.options = _options || {};
    params.event = event || "none";

    if(chrome.tabs) {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, params);
      });
    }
    else {
      pgmediator.trigger(event, _options);
    }
  }

  function setStorage(key,value) {
    localStorage.setItem("pxg_" + key, value);
  }
  function getStorage(key) {
    return localStorage.getItem("pxg_" + key);
  }


  $(".pxg-picker-items").find("input[type=radio]").on("click", function() {
    setStorage("color", $(this).val());
    emitEvent("change:guideColor", {"color": $(this).val() });
  });
  $(".pxg-guides-delete").on("click", function() { emitEvent("delete:guides",{}); });
  $(".pxg-guides-toggle").on("click", function() { emitEvent("toggle:guides",{}); });
  $(".pxg-rulers-toggle").on("click", function() { emitEvent("toggle:rulers",{}); });
  $(".pxg-rulersLock-toggle").on("click", function() { emitEvent("toggle:rulersLock",{}); });
  $(".pxg-detailedInfo-toggle").on("click", function() { emitEvent("toggle:detailedInfo") });
  $(".pxg-grid-save").on("click", function() { emitEvent("save:grid"); });
  $(".pxg-grid-open").on("click", function() { emitEvent("open:gridDialog"); });
  $(".pxg-grid-remove").on("click", function() { emitEvent("remove:grid"); });
  $(".pxg-all-toggle").on("click", function() { emitEvent("toggle:all"); });
  $(".pxg-all-show").on("click", function() { emitEvent("show:all"); });
  $(".pxg-all-hide").on("click", function() { emitEvent("hide:all"); });
  $(".pxg-all-snapdom").on("click", function() { emitEvent("snap:dom") });
  $("#pxg-form-snapto").on("submit", function(e) {
    e.preventDefault();
    emitEvent("snap:to", $("#pxg-form-snapto").formData());
  });
  $(".pxg-all-snapreset").on("click", function() { emitEvent("snap:reset", { x:0,y:0 }); });
})();
