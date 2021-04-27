
var CertsTableModel = Backbone.Model.extend({
    renderTable:function () {
        var html = "";
        var data = {"certs":[
                {
                    "id":"c5678",
                    "grade":"PSM® HL-100A1",
                    "type":"PC",
                    "supplier":"武汉华丽",
                    "certType":"UL",
                    "certNo":"27688",
                    "url":"https://www.baidu.com"
                },
                {
                    "grade":"PSM® HL-100A1",
                    "type":"PC",
                    "supplier":"武汉华丽",
                    "certType":"UL",
                    "certNo":"27688",
                    "id":"c6679",
                    "url":"/cert/previews"
                }
                ,
                {
                    "grade":"PSM® HL-100A1",
                    "type":"PC",
                    "supplier":"武汉华丽",
                    "certType":"UL",
                    "certNo":"27688",
                    "id":"c5679",
                    "url":"/cert/previews"
                },
                {
                    "grade":"PSM® HL-100A1",
                    "type":"PC",
                    "supplier":"武汉华丽",
                    "certType":"UL",
                    "certNo":"27688",
                    "id":"c5610",
                    "url":"/cert/previews"
                }
            ]
        };
            html += "<table class=\"table table-hover table-striped\">";
        html += "<thead class=\"bs_head_td\">";
        html += "<tr>";
        html += "<td class='bs-cell-cert'>  牌号  </td>";
        html += "<td class='bs-cell-cert'>  类别  </td>";
        html += "<td class='bs-cell-cert'>  厂商  </td>";
        html += "<td class='bs-cell-cert'>  证书种类  </td>";
        html += "<td class='bs-cell-cert'>  证书编号  </td>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody class='table-stripe'>";
        data.certs.forEach(function (value) {
            html += "<tr>";
            html += "<td class='bs-cell-cert'><a href=\"" + value.url +"/"+ value.id + "\" target='_blank'>" + value.grade + "</a></td>";
            html += "<td class='bs-cell-cert'>" + value.type + "</td>";
            html += "<td class='bs-cell-cert'>" + value.supplier + "</td>";
            html += "<td class='bs-cell-cert'>" + value.certType + "</td>";
            html += "<td class='bs-cell-cert'>" + value.certNo + "</td>";
            html+= "</tr>";
        });

        html += "</tbody>";
        html += "</table>";
        return html;
    }

});

