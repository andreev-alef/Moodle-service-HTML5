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

function save2WebDB(jsn) {
    if (typeof jsn.errorcode !== undefined) {
        var db;
        var version = '1';
        var dbName = 'mdl_categories';
        var dbDisplayName = 'Категории';
        var dbSize = 5 * 1024 * 1024;
        db = openDatabase(dbName, version, dbDisplayName, dbSize, function (database)
        {
            console.log("database creation callback");
        });
        db.transaction(function (t) {
            t.executeSql("CREATE TABLE IF NOT EXISTS cats (id INTEGER PRIMARY KEY, name TEXT, courseCount INTEGER, parentCat INTEGER)", [], null, null);
        });
        db.transaction(function (t) {
            var N = jsn.length;
            for (i = 0; N > i; i++) {
                t.executeSql('INSERT INTO cats (id, name, courseCount, parentCat) VALUES (?, ?, ?, ?)',
                        [jsn[i].id, jsn[i].name, jsn[i].coursecount, jsn[i].parent]);
            }
        }, function (t, sqlError) {
            //console.log(sqlError);
        });

        db.transaction(function (t) {
            t.executeSql('SELECT * FROM cats ORDER BY courseCount DESC', [], function (t, result) {
                console.log(result.rows.length);
                console.log(result.rows[0].id);
                getDataFromMoodle(result.rows);
            });
        });

    }
}

function getDataFromMoodle(jsonData) {
    //var jsn = jsonData;
    //if (typeof jsonData.errorcode !== undefined) {
    var N = jsonData.length;
    for (i = 0; N > i; i++) {
        //console.log((0 == jsonData[i].coursecount) ? ('–') : (jsonData[i].coursecount));
        $('#tbl_data').append('<tr>'
                + '<td>' + jsonData[i].id + '</td>'
                + '<td><a target="_blank" href="https://study.edu.tele-med.ai/course/index.php?categoryid=' + jsonData[i].id + '">' + jsonData[i].name + '</a>' + '</td>'
                + '<td>' + ((0 == jsonData[i].courseCount) ? (' ') : (jsonData[i].courseCount)) + '</td>'
                + '<td>' + getParent(jsonData, jsonData[i].parentCat) + '</td>'
                + '</tr>');
    }
    //}
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
            var jsn = data;
            save2WebDB(data);
        }
    });
});