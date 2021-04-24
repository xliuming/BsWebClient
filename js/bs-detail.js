
var TableModel = Backbone.Model.extend({

    renderTable:function() {

    var headers = this.get("header");
    var rows = this.get("rows");

    var html = "";

    html += "<table class=\"table table-striped table-hover\">";
    html += "<thead>";
    html += "<tr>";
    headers.forEach(function (value) {
        if(value.field === "value"){
            html+= "<td class='bs_head_td' scope=\"col\" style=\"text-align: right\">"+ value.name +"</td>"
        } else if(value.field === "name"){
            html+= "<td class='bs_head_td' scope=\"col\" style=\"font-weight: bold\">"+ value.name +"</td>"

        }else{
            html+= "<td class='bs_head_td' scope=\"col\">"+ value.name +"</td>"
        }
    });

    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";
    rows.forEach(function (value, index) {
        html += "<tr>";

        headers.forEach(function (value2, index2) {
            var field = value2.field;
            if(field === "value"){
                html += "<td style=\"text-align: right\">" + value[field] + "</td>";
            }else if(field === "name"){
                html += "<td style=\"padding-left: 1.5rem\">" + value[field] + "</td>";
            }
            else {

                html += "<td>" + value[field] + "</td>";
            }
        })
        html+= "</tr>"
    });

    html += "</tbody>";
    html += "</table>";
    // return entry
    return html;
  }
});

var TablesCollection = Backbone.Collection.extend({
  model: TableModel,
  resultList:function() {
    var html = "";
    if (this.length > 0) {
      for (var i = 0; i < this.length; i++) { html += this.at(i).renderTable(); }
    }
    return html;
  }
});


var CertTableModel = Backbone.Model.extend({

    renderTable:function () {
        var html = "";
        var rows;
        var index = 0;
        var certList;
        var title;
        certList = this.get("certList");
        title = this.get("name");

        rows = certList.length / 4;

        html += "<table class=\"bs-tb-certs table table-bordered table-hover-cells\">";
        html += "<thead class=\"bs_head_td\">";
        html += "<tr><td colspan='4' style=\"font-weight: bold\">" + title + "</td></tr>";
        html += "</thead>";
        html += "<tbody>";
        for(var r = 0; r< rows; r++){
            html += "<tr>";
            for(var c = 0; c< 4; c++){
                if (index< certList.length){
                    var orgCert = certList[index];
                    html += "<td class='bs-cell-cert'><a href=\""+ orgCert.fileUrl +"\" name=\""+ orgCert.name+"\" download>" + orgCert.name + "</a></td>";
                    index++;
                }else{
                    html += "<td class='bs-cell-cert'></td>";
                }
            }
            html+= "</tr>";
        }

        html += "</tbody>";
        html += "</table>";
        return html;
    }

});

var CertTBCollection = Backbone.Collection.extend({
    model: CertTableModel,
    resultList:function() {
        var html = "";
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) { html += this.at(i).renderTable(); }
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
