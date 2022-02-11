/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var sqlCreate = "CREATE TABLE IF NOT EXISTS cats (id INTEGER PRIMARY KEY, name TEXT, courseCount INTEGER, parentCat INTEGER)";
var sqlInsert = 'INSERT INTO cats (id, name, courseCount, parentCat) VALUES (?, ?, ?, ?)';

function getParent(jsonObj, parentID) {
    if (0 == parentID) {
        return ' ';
    } else {
        var M = jsonObj.length;
        for (ii = 0; M > ii; ii++) {
            if (jsonObj[ii].id == parentID) {
                return jsonObj[ii].name;
            }
        }
    }
}

function getDB(jsonData) {
    if (typeof jsonData.errorcode !== undefined) {
        var db;
        var version = '1';
        var dbName = 'mdl_categories';
        var dbDisplayName = 'Категории';
        var dbSize = 5 * 1024 * 1024;
        db = openDatabase(dbName, version, dbDisplayName, dbSize, function (database)
        {
            console.log("database creation callback");
        });
        return db;
    }
}

function selectFrom(fieldName, orderDirection) {
    db.transaction(function (t) {
        let sqlString = 'SELECT * FROM cats ORDER BY ' + fieldName + ' ' + orderDirection;
        t.executeSql(sqlString, [], function (t, result) {
            console.log(result.rows.length);
            console.log(result.rows[0].id);
            getData(result.rows);
        });
    });
}

function save2WebDB(jsn) {

    db = getDB(jsn);
    db.transaction(function (t) {
        t.executeSql(sqlCreate, [], null, null);
    });
    db.transaction(function (t) {
        let N = jsn.length;
        for (i = 0; N > i; i++) {
            t.executeSql(sqlInsert, [jsn[i].id, jsn[i].name, jsn[i].coursecount, jsn[i].parent]);
        }
    }, function (t, sqlError) {
        //console.log(sqlError);
    });
    selectFrom('id', 'asc');
}


function getData(jsonData) {
    //var jsn = jsonData;
    //if (typeof jsonData.errorcode !== undefined) {
    $('#tbl_data').empty();
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
    $('#sort-id-asc').click(function () {
        selectFrom('id', 'asc');
    });
    $('#sort-id-desc').click(function () {
        selectFrom('id', 'desc');
    });
    $('#sort-name-asc').click(function () {
        selectFrom('name', 'asc');
    });
    $('#sort-name-desc').click(function () {
        selectFrom('name', 'desc');
    });
    $('#sort-courses_count-asc').click(function () {
        selectFrom('courseCount', 'asc');
    });
    $('#sort-courses_count-desc').click(function () {
        selectFrom('courseCount', 'desc');
    });
    $('#sort-parent-asc').click(function () {
        selectFrom('parentCat', 'asc');
    });
    $('#sort-parent-desc').click(function () {
        selectFrom('parentCat', 'desc');
    });
});