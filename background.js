$(function () {
	setInterval(function () {
		$.getJSON("http://192.168.1.1/cgi-bin/webmain.cgi?act=summary", function (data) {
			level = calc_signal_level(data.wimax.status.link.RSSI, data.wimax.status.link.CINR);
			// chrome.browserAction.setBadgeText({ text: level + "/5" });
			chrome.browserAction.setIcon({ path:"images/"+level+".png"});
		});
    }, 5000);
});

/* 信号のレベルを求める関数
 * Mobile Slim Personal HotSpot[index.html line 64]を参考に修正させて頂いています。
 * RSSI 電波の強さ、CINR 電波のクリアさ
 * どちらの値も大きい方が良い、ただしRSSIは負の値なので0に近い方が良い。
 */
function calc_signal_level(rssi, cinr) {
	var level;

	if (rssi >= -45) {
		if (cinr > 20) level = 5;
		else if (cinr > 15) level = 4;
		else if (cinr > 10) level = 3;
		else if (cinr > 4) level = 2;
		else if (cinr > 0) level = 1;
		else level = 0;
	}
	else if (rssi >= -55) {
		if (cinr > 15) level = 4;
		else if (cinr > 10) level = 3;
		else if (cinr > 4) level = 2;
		else if (cinr > 0) level = 1;
		else level = 0;
	}
	else if (rssi >= -65) {
		if (cinr > 10) level = 3;
		else if (cinr > 4) level = 2;
		else if (cinr > 0) level = 1;
		else level = 0;
	}
	else if (rssi >= -75) {
		if (cinr > 4) level = 2;
		else if (cinr > 0) level = 1;
		else level = 0;
	}
	else if (rssi >= -85) {
		if (cinr > 0) level = 1;
		else level = 0;
	}
	else {
		level = 0;
	}
	return level;
}
