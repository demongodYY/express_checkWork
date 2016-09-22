/**
 * Created by loketa on 9/19/16.
 */


var setEndtimeBegin = function(id_startTime,id_EndTime){
    var startDate = $(id_startTime).datepicker('getDate');
    $(id_EndTime).datepicker('setStartDate',startDate);
};

$(document).ready(function () {
    $('.input-daterange').datepicker({
        inputs: $('.actual_range'),
        startDate:'0d',
        todayHighlight:'true',
        autoclose:true
    });
    $('#begin-date').datepicker("update" , new Date()).on('changeDate',function(e){
       setEndtimeBegin("#begin-date","#end-date");
    });


    var input_date= $('.input-date');
    input_date.datepicker({
        todayBtn:'linked',
        todayHighlight:'true',
        autoclose:true
    });
    input_date.datepicker("update",new Date());
});

