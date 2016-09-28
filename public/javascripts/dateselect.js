/**
 * Created by loketa on 9/19/16.
 */


$(document).ready(function () {
    $('.input-daterange').datepicker({
        inputs: $('.actual_range'),
        startDate:'0d',
        todayHighlight:'true',
        autoclose:true
    });

    var input_date= $('.input-date');
    input_date.datepicker({
        todayBtn:'linked',
        todayHighlight:'true',
        autoclose:true
    });
    input_date.datepicker("update",new Date());
});

