startTime = setTime(21, 24);
interval = 2000;

msg0 = [0, 1];
msg1 = [0, 1, 1, 0, 0, 1];
msg2 = [1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0];
msg = msg2;
sendMsg();
resStr = "";

function setTime(hours, minutes) {
    var t = new Date();
    t.setHours(hours);
    t.setMinutes(minutes);
    t.setSeconds(0);
    t.setMilliseconds(0);
    return t;
}

function sendMsg() {
    sendBit(0);
}

function sendBit(index) {
    if (index >= msg.length) {
	return;
    }
    
    chrome.windows.getAll({"populate" : true}, function (windows) {
	    var tabCount = 0;
            for (var i = 0; i < windows.length; i++) {
		tabCount += windows[i].tabs.length;
            }

	    var bit = msg[index];
	    if (bit == 1 && tabCount < 2) {
		resStr += "1";

		var waitTime = startTime.getTime() + interval*index - 
		    new Date().getTime();
		if (waitTime < 0) {
		    waitTime += 24*60*60*1000;
		}

                setTimeout(function(){
			var myWin = window.open();
			setTimeout(function() {
				myWin.close();
			    }, interval/2);
			sendBit(index + 1);
		    }, waitTime);
	
	    } else {
		resStr += "0";

                var waitTime = startTime.getTime() + interval*index -
                    new Date().getTime();
		if (waitTime < 0) {
                    waitTime += 24*60*60*1000;
		}

		setTimeout(function(){
			sendBit(index + 1);
		    }, waitTime);
	    }
	    
	    if (index == msg.length - 1) 
		console.log(resStr);
	});
}