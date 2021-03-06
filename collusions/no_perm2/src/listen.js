startTime = setTime(21, 24);
interval = 2000;
msg = "";
msgLength = 15;
readMsg();

function setTime(hours, minutes) {
    var t = new Date();
    t.setHours(hours);
    t.setMinutes(minutes);
    t.setSeconds(0);
    t.setMilliseconds(500);
    return t;
}

function readMsg() {
    for (var index = 0; index < msgLength; index++) {
	if (index >= msgLength) {
	    return;
	}
		
	var waitTime = startTime.getTime() + interval*index - 
	    new Date().getTime();
	if (waitTime < 0) {
	    waitTime += 24*60*60*1000;
	}

	setTimeout(function() {
		chrome.windows.getAll({"populate" : true}, function (windows) {
			var tabCount = 0;
			for (var i = 0; i < windows.length; i++) {
			    tabCount += windows[i].tabs.length;
			}

			if (tabCount < 2) {
			    msg += "0";
			} else {
			    msg += "1";
			}
			
			if (msg.length == msgLength) {
			    console.log(msg);
			}
		    });
	    }, waitTime);
    }
}