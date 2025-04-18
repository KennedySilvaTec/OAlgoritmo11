modelfilestrs['youtube'] = hereDoc(function(){/*!
<script type="text/javascript">

 

	// pageChanged & sizeChanged functions are needed in every model file
	// other functions for model should also be in here to avoid conflicts
	var youtube = new function() {
		// function called every time the page is viewed after it has initially loaded
		this.pageChanged = function() {

		};

		// function called every time the size of the LO is changed
		this.sizeChanged = function() {

		};

		this.init = function() {
			var $textHolder = $("#textHolder"),
				$panel = $("#pageContents .panel");

			$textHolder.html(x_addLineBreaks(x_currentPageXML.getAttribute("text")));
			$panel.addClass("x_floatRight");

			// Get the youtube code the user pasted
			var youtubeCode = $($(x_currentPageXML)).text();

			// Start with some defaults and build on them
			var iframe = {code:"", width:420, height:315, time:0, related:1, autoplay:0, allowfullscreen:false};

			if (youtubeCode.length == 11) {
				iframe.code = youtubeCode;
			}
			else if (youtubeCode.indexOf('iframe') != -1) {
				iframe = this.parseIframeCode(youtubeCode, iframe);
			}
			else if (youtubeCode.substring(0, 30).toLowerCase().indexOf("www.youtube.com/watch?") != -1) {
				var idx = youtubeCode.substring(0, 30).toLowerCase().indexOf("www.youtube.com/watch?");
				var keypairs = youtubeCode.substring(idx+22).split('&');
				for (var i=0; i < keypairs.length; i++) {
					var parts = keypairs[i].split("=");
					if (parts[0] == "v") {
						iframe.code = parts[1];
					}
					else if (parts[0] == "t") {
						iframe.time = eval(parts[1].replace("s", "").replace("m", "*60+"));
					}
				}
			}
			else if (youtubeCode.substring(0, 17).toLowerCase().indexOf("youtu.be/") != -1) {
				var idx = youtubeCode.substring(0, 17).toLowerCase().indexOf("youtu.be/");
				var finish = youtubeCode.length;
				if (youtubeCode.indexOf('?') != -1 ) {
					finish = youtubeCode.indexOf('?');
					var params = youtubeCode.substring(finish + 1);
					var parts = params.split("=");
					if (parts[0] == "t") {
						iframe.time = eval(parts[1].replace("s", "").replace("m", "*60+"));
					}
				}
				iframe.code = youtubeCode.substring(idx+9, finish);
			}
			else if (youtubeCode.indexOf('http://www.youtube.com/v/') != -1) {
				var str = 'http://www.youtube.com/v/';
				var start = youtubeCode.indexOf(str) + str.length;
				iframe.code = youtubeCode.substr(start, 11);
			}
			else if (youtubeCode.indexOf('https://www.youtube.com/v/') != -1) {
				var str = 'https://www.youtube.com/v/';
				var start = youtubeCode.indexOf(str) + str.length;
				iframe.code = youtubeCode.substr(start, 11);
			}

			var videoSize = x_currentPageXML.getAttribute("videoSize");
			if (videoSize != null && videoSize != '') {
				var splitters = ",xX|-_".split("");
				for (var i = 0; i < splitters.length; i++)
				{
					if (videoSize.indexOf(splitters[i]) != -1) {
						iframe.width = parseInt(videoSize.split(splitters[i])[0]);
						iframe.height = parseInt(videoSize.split(splitters[i])[1]);
						break;
					}
				}
			}

			$("#pageVideo").html(this.buildIframe(iframe));

			// call this function in every model once everything's loaded
			x_pageLoaded();
		};

		this.buildIframe = function(iframe) {
			if (iframe.code.length > 0) {
				var html = "<iframe";
				html += " width=\"" + iframe.width + "\"";
				html += " height=\"" + iframe.height + "\"";
				
				if (xot_offline == true) {
					html += " src=\"https://www.youtube.com/embed/" + iframe.code;
				} else {
					html += " src=\"//www.youtube.com/embed/" + iframe.code;
				}
				
				var params = "?wmode=opaque";
				if (iframe.time > 0) {
					params += "&start=" + iframe.time;
				}
				if (iframe.related == 0) {
					params += "&rel=0";
				}
				if (iframe.autoplay == 1) {
					params += "&autoplay=1";
				}
				if (params.length > 1) {
					html += params;
				}
				html += "\"";
				html += " frameborder=\"0\"";
				//if (iframe.allowfullscreen != false) {
				html += " allowfullscreen";
				//}
				html += "></iframe>";
				return html;
			}
			else {
				return "<p>" + x_getLangInfo(x_languageData.find("loadError")[0], "label", "Error loading") + "</p>";
			}
		};

		this.parseIframeCode = function(code, params) {
			var parts = code.split(' ');
			for (var i = 0; i < parts.length; i++) {
				if (parts[i].indexOf("=") != -1) {
					var part = parts[i].split("=");
					if (part.length == 3) {
						part[1] += "=" + part[2];
					}
					var val = ("" + part[1]).replace('"', '');
					if (part[0] == "width") {
						params.width = parseInt(val);
					} else if (part[0] == "height") {
						params.height = parseInt(val);
					} else if (part[0] == "src") {
						if (val.indexOf('?rel=0') != -1) {
							params.related = 0;
							val = val.replace('?rel=0', '');
						}
						val = val.replace('?rel=1', '');
						var s = val.indexOf('//www.youtube.com/embed/') + 24;
						var f = val.indexOf('"', s+1);
						params.code = val.substring(s, f);
					}
				}
			}
			return params;
		};
	};

	youtube.init();


</script>


<div id="pageContents">

	<div class="mobileAlign"> <!-- this tag is only used when viewed on mobiles to change layout -->
		<div class="panel inline">
			<div id="pageVideo"></div>
		</div>
	</div>

	<div id="textHolder"></div>

</div>

*/});