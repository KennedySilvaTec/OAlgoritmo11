modelfilestrs['embedDiv'] = hereDoc(function(){/*!
<script type="text/javascript">

 
	// pageChanged & sizeChanged functions are needed in every model file
	// other functions for model should also be in here to avoid conflicts
	var embedDiv = new function() {
		// function called every time the page is viewed after it has initially loaded
		this.pageChanged = function() {
			
		}
		
		// function called every time the size of the LO is changed
		this.sizeChanged = function() {
			$("#iFrame").height(embedDiv.calcHeight());
		}
		
		this.init = function() {
			var $pageContents = $("#pageContents"),
				$iFrameHolder = $pageContents;
			
			if (x_currentPageXML.getAttribute("text") != undefined && x_currentPageXML.getAttribute("text") != "") {
				if (x_currentPageXML.getAttribute("align") != "Right") {
					$pageContents.html('<div class="splitScreen"><div class="left">' + x_addLineBreaks(x_currentPageXML.getAttribute("text")) + '</div><div class="right"></div></div>');
					$iFrameHolder = $pageContents.find(".right");
					
					if (x_currentPageXML.getAttribute("windowWidth") == "Small") {
						$("#pageContents .splitScreen").addClass("large");
					} else if (x_currentPageXML.getAttribute("windowWidth") == "Large") {
						$("#pageContents .splitScreen").addClass("small");
					}
					
				} else {
					$pageContents.html('<div class="splitScreen"><div class="left"></div><div class="right">' + x_addLineBreaks(x_currentPageXML.getAttribute("text")) + '</div></div>');
					$iFrameHolder = $pageContents.find(".left");
					
					if (x_currentPageXML.getAttribute("windowWidth") == "Small") {
						$("#pageContents .splitScreen").addClass("medium");
					} else if (x_currentPageXML.getAttribute("windowWidth") == "Large") {
						$("#pageContents .splitScreen").addClass("xlarge");
					}
				}
			}
			
			var pageSrc = x_currentPageXML.getAttribute("src");
			if (pageSrc.substr(0, 1) == "<") { // insert html directly
				$iFrameHolder.html(pageSrc);
				if ($iFrameHolder.children()[0].nodeName.toLowerCase() == "iframe" && $iFrameHolder.children()[0].getAttribute("width") != undefined) {
					// if iframe has set size then remove splitScreen css
					$("#pageContents .splitScreen").removeClass("splitScreen small medium large xlarge");
					$iFrameHolder.addClass("centre");
				}
			} else { // use iframe to load web page
				// if project is being viewed as https then force iframe to be https too
				if (window.location.protocol == "https:" && pageSrc.indexOf("http:") == 0) {
					pageSrc = "https:" + pageSrc.substring(pageSrc.indexOf("http:") + 5);
				}
				var iFrameTag = '<iframe id="iFrame" src="' + pageSrc + '" width="100%" height="' + embedDiv.calcHeight() + '" frameBorder="0"></iframe>';
				$iFrameHolder.html(iFrameTag);
				$iFrameHolder.addClass("centerAlign");
			}
			
			// call this function in every model once everything's loaded
			x_pageLoaded();
		}
		
		this.calcHeight = function() {
			var frameHeight;
			if (x_browserInfo.mobile == false) {
				frameHeight = $x_pageHolder.height() - parseInt($x_pageDiv.css("padding-top")) * 3;
			} else {
				frameHeight = $x_mobileScroll.height() - $x_headerBlock.height() - $x_footerBlock.height() - (parseInt($x_pageDiv.css("padding-top")) * 2) - 3;
			}
			return frameHeight;
		}
	}
	
	embedDiv.init();
	
</script>


<div id="pageContents">
	
</div>

*/});