/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getParent(jsonObj, parentID) {
    if (0 == parentID) {
        return 'Нет родительской категории';
    }
    var M = jsonObj.length;
    for (ii = 0; M > ii; ii++) {
        if (jsonObj.id == parentID) {
            return jsonObj.parent;
        }
    }
}



$(document).ready(function () {
    var domainname = 'https://study.edu.tele-med.ai';
    var token = 'e34754ef2e1ce0df4c8ca95f96f040cf';
    var functionname = 'core_course_get_categories';
    var serverurl = domainname + '/webservice/rest/server.php';
    var data = {
        wstoken: token,
        wsfunction: functionname,
        moodlewsrestformat: 'json',
        //id: 73 //Retrieve results based on course Id 2
    }


    var response = $.ajax(
            {type: 'GET',
                data: data,
                dataType: "json", // тип загружаемых данных
                url: serverurl,
                success: function (data, textStatus) {
                    var jsn = data;
                    console.log(jsn);
                    var jsn = data;
                    if (typeof jsn.errorcode !== undefined) {
                        //$('#data_out').html(JSON.stringify(jsn[1]));
                        //$('#data_out').append('<table id="tbl_data" class="table table-striped"><t></table>')
                        var N = jsn.length;
                        for (i = 0; N > i; i++) {
                            $('#tbl_data').append('<tr>'
                                    + '<td>' + jsn[i].id + '</td>'
                                    + '<td>' + jsn[i].name + '</td>'
                                    + '<td>' + getParent(jsn, jsn[i].parent) + '</td>'
                                    + '</tr>');
                        }
                    }
                }
            }
    );
});