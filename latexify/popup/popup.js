function helper(){
	alert("HELP");
  }
  
  browser.tabs.executeScript({file: "/keyboard/js/keyboard.js"}).then(helper);

