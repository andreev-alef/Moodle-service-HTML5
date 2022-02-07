/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getParent(jsonObj, parentID) {
    if (0 == parentID) {
        return ' ';
    }
    var M = jsonObj.length;
    for (ii = 0; M > ii; ii++) {
        if (jsonObj[ii].id == parentID) {
            return jsonObj[ii].name;
        }
    }
}

function getDataFromMoodle(jsonData) {
    //var jsn = jsonData;
    if (typeof jsonData.errorcode !== undefined) {
        var N = jsonData.length;
        for (i = 0; N > i; i++) {
            console.log((0 == jsonData[i].coursecount) ? ('–') : (jsonData[i].coursecount));
            $('#tbl_data').append('<tr>'
                    + '<td>' + jsonData[i].id + '</td>'
                    + '<td><a target="_blank" href="https://study.edu.tele-med.ai/course/index.php?categoryid=' + jsonData[i].id + '">' + jsonData[i].name + '</a>' + '</td>'
                    + '<td>' + ((0 == jsonData[i].coursecount) ? (' ') : (jsonData[i].coursecount)) + '</td>'
                    + '<td>' + getParent(jsonData, jsonData[i].parent) + '</td>'
                    + '</tr>');
        }
    }
    return;
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
    };
    var response = $.ajax({
        type: 'GET',
        data: data,
        dataType: "json", // тип загружаемых данных
        url: serverurl,
        success: function (data, textStatus) {
            //var jsn = data;
            console.log(data);
            getDataFromMoodle(data);
        }
    });
});