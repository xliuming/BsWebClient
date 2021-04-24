var RowModel = Backbone.Model.extend({
    //default keys are "grade":"POLIMAXX GP150","type":"PS(GPPS)","supplier":"日本出光","propertys":["透光性好","冲击性能好"],"hasCertificate":1,"newsTitle":"我是新闻标题","newsLink": "www.baidu.com"

    renderRow:function(style) {

    var grade = this.get("grade");
    var type = this.get("type");
    var supplier = this.get("supplier");
    var propertys = this.get("propertys");
    var hasCertificate = this.get("hasCertificate");
    var newsTitle = this.get("newsTitle");
    var newsLink = this.get("newsLink");
    var desc = this.get("desc");
    var propertysText = propertys? propertys.join(","): "";
    var html = "";

    if (style == "paragraph") {
        html += "<div class=\"searchItem\">";
        html += "<h4 class=\"itemTitle\">";
        html += "<a href=\"./detail.html\" target=\"_blank\">"+ grade + " | "+ type+ " | "+ supplier+ "</a>";
        if(hasCertificate == 1) html += "<span class=\"certLabel\">"+ "证书" +"</span>";
        html += "</h4>";
        if(desc!= null && desc!= undefined) html += "<p class=\"desc\">" + desc + "</p>";

        html += "<div class=\"row feature-block\">";
        html += "<div class=\"col-md-2\">";
        html += "<p class=\"feature\"><span class=\"strong\">" + "特性：" + "</span>" + propertysText + "</p>";
        html += "</div>";
        html += "<div class=\"col-md-2\">";
        html += "<p class=\"feature\"><span class=\"strong\">" + "用途：" + "</span>" + propertysText + "</p>";
        html += "</div>";
        html += "</div>";
        html += "<p class=\"newsTitle\"><a class=\"small\" href=\"" + newsLink + "\" target=\"_self\">资讯：" + newsTitle + "  》》》</a></p>";
        html += "</div>";
    }

    // return entry
    return html;
  }
});

var RowCollection = Backbone.Collection.extend({
  model: RowModel,
  resultList:function() {
    var html = "";
    if (this.length > 0) {
      for (var i = 0; i < this.length; i++) { html += this.at(i).renderRow("paragraph"); }
    }
    return html;
  }
});

// helper functions

function addHover() {
  if (document.all&&document.getElementById) {
    var divs = document.getElementsByTagName("div");
    for (i=0; i<divs.length; i++) {
      var node = divs[i];
      if (node.className=="searchresults") {
        node.onmouseover=function() {
          this.className+=" hover";
        }
        node.onmouseout=function() {
          this.className=this.className.replace(" hover", "");
        }
      }
    }
  }
}


function statistics(startRecord, totalcount, perPageRecord, navurlbase) {
  if (totalcount == 0) return;
  // if (startRecord >= 0) document.getElementById("startRecord").setAttribute('value', startRecord);

  // compose page navigation
  var results_from = parseInt(startRecord) + 1;
  var results_to = totalcount;
  var resnavElement = document.getElementById("resNav");
  if (resnavElement != null) {
    var resnav = "<ul class=\"pagination\">";
    thispage = Math.floor(startRecord / perPageRecord);
    if (thispage == 0) {
      resnav += "<li class=\"disabled\"><a href=\"#\">&laquo;</a></li>";
    } else {
      resnav += "<li><a id=\"prevpage\" href=\"";
      resnav += (navurlbase + "&amp;startRecord=" + ((thispage - 1) * perPageRecord));
      resnav += "\">&laquo;</a></li>";
    }

    numberofpages = Math.floor(Math.min(5, 1 + ((totalcount - 1) / perPageRecord)));
    if (!numberofpages) numberofpages = 10;
	  for (i = 0; i < numberofpages; i++) {
      if (i == thispage) {
        resnav += "<li class=\"active\"><a href=\"#\">";
        resnav += (i + 1);
        resnav += "</a></li>";
      } else {
        resnav += "<li><a href=\"";
        resnav += (navurlbase + "&amp;startRecord=" + (i * perPageRecord));
        resnav += "\">" + (i + 1) + "</a></li>";
      }
    }
    if (thispage >= numberofpages) {
      resnav += "<li><a href=\"#\">&raquo;</a></li>";
    } else {
      resnav += "<li><a id=\"nextpage\" href=\"";
      resnav += (navurlbase + "&amp;startRecord=" + ((thispage + 1) * perPageRecord));
      resnav += "\">&raquo;</a>";
    }
    resnav += "</ul>";
    resnavElement.innerHTML = resnav;
  }
}

function toggleVisibility(name, count) {
	if (document.getElementById(name + "_0").style.display == "none") {
		for (i = 0; i < count; i++) document.getElementById(name + "_" + i).style.display="block";
		document.getElementById("chevron-" + name).className = "glyphicon glyphicon-chevron-up";
	} else {
		for (i = 0; i < count; i++) document.getElementById(name + "_" + i).style.display="none";
		document.getElementById("chevron-" + name).className = "glyphicon glyphicon-chevron-down";
	}
}
