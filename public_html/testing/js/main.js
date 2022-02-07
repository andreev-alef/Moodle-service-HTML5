/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
                }
            }
    );
});