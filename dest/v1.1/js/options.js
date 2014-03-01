$(function() {

  function init() {
    var color = getStorage("color");

    if(color){
      $(".pxg-picker-items").find("input[type=radio]"+"[value="+color+"]").prop("checked", "checked");
    }
  }

  $(".pxg-picker-items").find("input[type=radio]").on("click", function() {
    setStorage("color" ,$(this).val());
  });

  function setStorage(key,value) {
    localStorage.setItem("pxg_" + key, value);
  }
  function getStorage(key) {
    return localStorage.getItem("pxg_" + key);
  }

  init();
});