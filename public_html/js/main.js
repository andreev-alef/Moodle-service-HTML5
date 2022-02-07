/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {
                var domainname = 'https://study.edu.tele-med.ai';
                var token = 'e34754ef2e1ce0df4c8ca95f96f040cf';
                var functionname = 'core_course_get_courses';
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
                                if (typeof jsn.errorcode !== undefined) {
                                    //$('#data_out').html(JSON.stringify(jsn[1]));
                                    //$('#data_out').append('<table id="tbl_data" class="table table-striped"><t></table>')
                                    var N = jsn.length;
                                    for (i = 0; N > i; i++) {
                                        $('#tbl_data').append('<tr>'
                                                + '<td>' + jsn[i].id + '</td>'
                                                + '<td>' + jsn[i].shortname + '</td>'
                                                + '<td><a target="_blank" href="https://study.edu.tele-med.ai/course/view.php?id=' + jsn[i].id + '">'
                                                + jsn[i].fullname + '</a></td>'
                                                + '</tr>');
                                    }
                                } else {
                                    $('#data_out').html('<b>' + jsn.exception + '<br />'
                                            + jsn.errorcode + '<br />'
                                            + jsn.message + '<br /></b>');
                                }
                                console.log(jsn);
                                console.log(typeof jsn.errorcode);
                            }
                        }
                );
            }
            );