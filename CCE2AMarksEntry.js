$(document).ready(function () {

    $("#sidebar").find("#btnMarksEntryCoscholasticSixtoEight").on('click', function (e) {
        e.preventDefault();
        //e.stopPropagation();

        $.ajax({

            beforeSend: function () {
                $("#top").find(".containerDiv").show();
            },
            url: '/CCE2AMarksEntry/TwoAMarksEntryDetailSixtoEight',
            type: this.method,
            data: {},
            success: function (result) {
                $("#container").find("#main").html(result);
                $(window).scrollTop(0);
                $("#top").find(".containerDiv").hide();
            }

        });
    });

    $("#sidebar").find("#btnIndicatorMarksEntryCoscholasticSixtoEight").on('click', function (e) {
        e.preventDefault();
        //e.stopPropagation();

        $.ajax({

            beforeSend: function () {
                $("#top").find(".containerDiv").show();
            },
            url: '/CCE2AMarksEntry/IndicatorMarksEntryCoscholasticSixtoEight',
            type: this.method,
            data: {},
            success: function (result) {
                $("#container").find("#main").html(result);
                $(window).scrollTop(0);
                $("#top").find(".containerDiv").hide();
            }

        });
    });
});


$(function () {
    var btnsubmit;
    $("#FormMarksEntryDetailSixtoEight").find('input[type="submit"]').live('click', function () {
        btnsubmit = $(this).val();
    })

    $('#FormMarksEntryDetailSixtoEight').live('submit', function (e) {
        e.preventDefault();
        //e.stopPropagation();

        var Courselevel = $(this).find('#ddlCourselevel').val();
        var Course = $(this).find('#ddlCourse').val();
        var Division = $(this).find('#ddlDivision').val();
        var Type = $(this).find('#ddlActivity').val();
        var Group = $(this).find('#ddlGroup').val();
        //var btnsubmit = $(this).find('input[type="submit"]').val();
        var msg = "";


        var info = "<root>";


        $('#FormMarksEntryDetailSixtoEight').find('#tblMarksEntryDetailSixtoEight').find('tbody tr').each(function () {
            var StudentId = $(this).attr("id");
            $(this).find('.ActivityMarks').each(function () {
                var ActivityId = $(this).find('input').attr('id');
                var Marks = $(this).find('input').val();
                var AvgMarks = $(this).closest('tr').find('.AvgMarks').find('input').val();
                if (ActivityId > 0) {
                    //var node = '<MarksEntry StudentId="' + StudentId + '" ActivityId ="' + ActivityId  + '" Marks="' + Marks + '" />';
                    var node = '<node><StudentId>' + StudentId + '</StudentId><ActivityId>' + ActivityId + '</ActivityId><Marks>' + Marks + '</Marks><AvgMarks>' + AvgMarks + '</AvgMarks></node>';
                    node = node.replace("<node><StudentId>undefined</StudentId><ActivityId>undefined</ActivityId><Marks>undefined</Marks><AvgMarks>undefined</AvgMarks></node>", ' ');
                    info += node;
                }



            });
        });
        info += "</root>";
        $('#FormMarksEntryDetailSixtoEight').find('#MarksXML').val(info);
        var FD = $(this).serialize();

        if (Courselevel == '' || Courselevel == 0 || Courselevel == undefined) {
            $("#FormMarksEntryDetailSixtoEight").find('#ddlCourselevel').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormMarksEntryDetailSixtoEight").find('#ddlCourselevel').css("border", "");
            }, 10000);
            msg += "Medium is required.,\n";
        }
        if (Course == '' || Course == 0 || Course == undefined) {
            $("#FormMarksEntryDetailSixtoEight").find('#ddlCourse').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormMarksEntryDetailSixtoEight").find('#ddlCourse').css("border", "");
            }, 10000);
            msg += "Standard is required.,\n";
        }
        if (Division == '' || Division == 0 || Division == undefined) {
            $("#FormMarksEntryDetailSixtoEight").find('#ddlDivision').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormMarksEntryDetailSixtoEight").find('#ddlDivision').css("border", "");
            }, 10000);
            msg += "Division is required.,\n";
        }
        if (Type == '' || Type == 0 || Type == undefined) {
            $("#FormMarksEntryDetailSixtoEight").find('#ddlActivity').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormMarksEntryDetailSixtoEight").find('#ddlActivity').css("border", "");
            }, 10000);
            msg += "Activity Name is required.,\n";
        }
        if (Group == '' || Group == 0 || Group == undefined) {
            $("#FormMarksEntryDetailSixtoEight").find('#ddlGroup').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormMarksEntryDetailSixtoEight").find('#ddlGroup').css("border", "");
            }, 10000);
            msg += "Group Name is required.,\n";
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        if (btnsubmit == "Search") {
            $.ajax({

                beforeSend: function () {
                    $("#top").find(".containerDiv").show();
                },
                url: '/CCE2AMarksEntry/TwoAMarksEntryDetailSixtoEight',
                type: "GET",
                data: { Courselevelid: Courselevel, Courseid: Course, Divisionid: Division, Typeid: Type, Groupid: Group },
                success: function (result) {
                    $("#container").find("#main").html(result);
                    $(window).scrollTop(0);
                    $("#top").find(".containerDiv").hide();
                }

            });
        }

        if (btnsubmit == "Save") {

            $.ajax({

                beforeSend: function () {
                    $("#top").find(".containerDiv").show();
                },
                //url: '/CCEPrimaryThirdtoEight/AssignMarksThirdtoEight?MARKXML=' + info,
                url: '/CCE2AMarksEntry/TwoAMarksEntryDetailSixtoEight',
                type: "POST",
                data: FD,
                success: function (result) {
                    if (result != '') {
                        alert('Inserted Successfully !!!');
                    }
                    $("#top").find(".containerDiv").hide();
                    $("#sidebar").find("#btnMarksEntryCoscholasticSixtoEight").click();
                }

            });
        }
    });

});

$('#FormMarksEntryDetailSixtoEight').find('#tblMarksEntryDetailSixtoEight').find(".Decimalvals").live('keyup', function (e) {
    var Amount = parseFloat($(this).val());
    var thisAmount = $(this).val();
    var vals = thisAmount.split('.');//.pop();
    var Maxmarks = parseFloat($(this).closest('td').attr('id'));

    if (Amount > Maxmarks) {
        alert('Marks Should not be Greater than Max Marks');
        $(this).val('');
        $('#FormMarksEntryDetailSixtoEight').find('#tblMarksEntryDetailSixtoEight').find(".Decimalvals").trigger('change');
    }
    if (vals[1].length > 2 && e.which != 0 && e.which != 8) {
        $(this).val(Amount.toFixed(2));
    }


});

$('#FormMarksEntryDetailSixtoEight').find('#tblMarksEntryDetailSixtoEight').find(".Decimalvals").live('change', function (e) {
    var Amount = parseFloat($(this).val());
    var thisAmount = $(this).val();
    var vals = thisAmount.split('.');//.pop();
    var Maxmarks = parseFloat($(this).closest('td').attr('id'));
    var TotMarks = 0;
    var AverageMarks = 0;
    var Count = 0;

    $(this).closest('tr').each(function () {
        TotMarks = 0;
        Count = 0;
        $(this).find('.ActivityMarks').each(function () {
            var ActivityId = $(this).find('input').attr('id');
            var Marks = $(this).closest('td').find('input').val();
            
            if (ActivityId > 0 && Marks > 0 && Marks != '') {                
                TotMarks += parseFloat(Marks);
            }
            Count += 1;
        });
    });
    
    if (Count > 0) {
        AverageMarks = parseFloat(TotMarks) / Count;
    }
    $(this).closest('tr').find('.AvgMarks').find('input').val(AverageMarks);

});


$(function () {
    var btnsubmit;
    $("#FormIndicatorMarksEntryDetailSixtoEight").find('input[type="submit"]').live('click', function () {
        btnsubmit = $(this).val();
    })

    $('#FormIndicatorMarksEntryDetailSixtoEight').live('submit', function (e) {
        e.preventDefault();
        //e.stopPropagation();

        var Courselevel = $(this).find('#ddlCourselevel').val();
        var Course = $(this).find('#ddlCourse').val();
        var Division = $(this).find('#ddlDivision').val();
        var Type = $(this).find('#ddlActivity').val();
        var Group = $(this).find('#ddlGroup').val();
        //var btnsubmit = $(this).find('input[type="submit"]').val();
        var msg = "";


        var info = "<root>";


        $('#FormIndicatorMarksEntryDetailSixtoEight').find('#tblIndicatorMarksEntryDetailSixtoEight').find('tbody tr').each(function () {
            var StudentId = $(this).attr("id");
            var IndicatorId = $(this).find('.Indicator').find('.ddlIndicator').val();
            var node = '<node><StudentId>' + StudentId + '</StudentId><IndicatorId>' + IndicatorId + '</IndicatorId></node>';
            node = node.replace("<node><StudentId>undefined</StudentId><IndicatorId>undefined</IndicatorId></node>", ' ');
            info += node;
            //$(this).find('.ActivityMarks').each(function () {
            //    var ActivityId = $(this).find('input').attr('id');
            //    var Marks = $(this).find('input').val();
            //    var AvgMarks = $(this).closest('tr').find('.AvgMarks').find('input').val();
            //    if (ActivityId > 0) {
            //        //var node = '<MarksEntry StudentId="' + StudentId + '" ActivityId ="' + ActivityId  + '" Marks="' + Marks + '" />';
            //        var node = '<node><StudentId>' + StudentId + '</StudentId><ActivityId >' + ActivityId + '</ActivityId ><Marks>' + Marks + '</Marks><AvgMarks>' + AvgMarks + '</AvgMarks></node>';
            //        node = node.replace("<node><StudentId>undefined</StudentId><ActivityId >undefined</ActivityId ><Marks>undefined</Marks><AvgMarks>undefined</AvgMarks></node>", ' ');
            //        info += node;
            //    }



            //});
        });
        info += "</root>";
        $('#FormIndicatorMarksEntryDetailSixtoEight').find('#MarksXML').val(info);
        var FD = $(this).serialize();

        if (Courselevel == '' || Courselevel == 0 || Courselevel == undefined) {
            $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlCourselevel').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlCourselevel').css("border", "");
            }, 10000);
            msg += "Medium is required.,\n";
        }
        if (Course == '' || Course == 0 || Course == undefined) {
            $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlCourse').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlCourse').css("border", "");
            }, 10000);
            msg += "Standard is required.,\n";
        }
        if (Division == '' || Division == 0 || Division == undefined) {
            $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlDivision').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlDivision').css("border", "");
            }, 10000);
            msg += "Division is required.,\n";
        }
        if (Type == '' || Type == 0 || Type == undefined) {
            $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlActivity').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlActivity').css("border", "");
            }, 10000);
            msg += "Activity Name is required.,\n";
        }
        if (Group == '' || Group == 0 || Group == undefined) {
            $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlGroup').css("border", "1px solid red");
            setTimeout(function () {
                $("#FormIndicatorMarksEntryDetailSixtoEight").find('#ddlGroup').css("border", "");
            }, 10000);
            msg += "Group Name is required.,\n";
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        if (btnsubmit == "Search") {
            $.ajax({

                beforeSend: function () {
                    $("#top").find(".containerDiv").show();
                },
                url: '/CCE2AMarksEntry/IndicatorMarksEntryCoscholasticSixtoEight',
                type: "GET",
                data: { Courselevelid: Courselevel, Courseid: Course, Divisionid: Division, Typeid: Type, Groupid: Group },
                success: function (result) {
                    $("#container").find("#main").html(result);
                    $(window).scrollTop(0);
                    $("#top").find(".containerDiv").hide();
                }

            });
        }

        if (btnsubmit == "Save") {
            
            $.ajax({

                beforeSend: function () {
                    $("#top").find(".containerDiv").show();
                },
                //url: '/CCEPrimaryThirdtoEight/AssignMarksThirdtoEight?MARKXML=' + info,
                url: '/CCE2AMarksEntry/IndicatorMarksEntryCoscholasticSixtoEight',
                type: "POST",
                data: FD,
                success: function (result) {
                    if (result != '') {
                        alert('Inserted Successfully !!!');
                    }
                    $("#top").find(".containerDiv").hide();
                    $("#sidebar").find("#btnIndicatorMarksEntryCoscholasticSixtoEight").click();
                }

            });
        }
    });

});

