$(function() {
  var evt         = new Event();
  var dragdrop    = new Dragdrop(evt);
  var rg;
  var isInit = false;

  function init() {
    if(isInit) return false
    rg = new RulersGuides(evt, dragdrop);
    isInit = true;
  }

  function changeGuideColor(options) {
    if(!options.color) return;

    $(".rg-overlay").removeClass (function (index, css) {
      return (css.match (/\bpg-color-\S+/g) || []).join(' ');
    }).addClass("pg-color-" + options.color);
  }

  if(chrome.extension){
    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      pgmediator.trigger(request.event, request.options);
    });
  }

  var resizeDebounced = $.debounce(500, function() { pgmediator.trigger("resize"); });
  $(window).on("resize", function() { resizeDebounced(); });

  pgmediator = $("<div>")
    .on("init", function(e, options) { init(); })
    .on("change:guideColor", function(e, options) { changeGuideColor(options); })
    .on("toggle:guides", function(e, options) { rgmediator.trigger("toggleGuides"); })
    .on("delete:guides", function(e, options) { rgmediator.trigger("deleteGuides"); })
    .on("toggle:all", function(e, options) { rgmediator.trigger("toggleAll"); })
    .on("show:all", function(e, options) { rgmediator.trigger("showAll"); })
    .on("hide:all", function(e, options) { rgmediator.trigger("hideAll"); })
    .on("toggle:rulers", function(e, options) { rgmediator.trigger("toggleRulers"); })
    .on("toggle:rulersLock", function(e, options) { rgmediator.trigger("toggleRulersLock"); })
    .on("save:grid", function(e, options) { rgmediator.trigger("saveGrid"); })
    .on("remove:grid", function(e, options) { rgmediator.trigger("removeGrid"); })
    .on("open:gridDialog", function(e, options) { rgmediator.trigger("openGridDialog"); })
    .on("toggle:detailedInfo", function(e, options) { rgmediator.trigger("showDetailedInfo"); })
    .on("snap:dom", function(e, options) { rgmediator.trigger("snapDom"); })
    .on("resize", function(e, options) { rgmediator.trigger("resize"); })

});


