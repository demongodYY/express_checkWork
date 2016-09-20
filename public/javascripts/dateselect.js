/**
 * Created by loketa on 9/19/16.
 */

$(document).ready(function () {
    $('.input-daterange input').each(function() {
        $(this).datepicker({
            format:'yyyy/mm/dd',
            todayBtn:'linked',
            todayHighlight:'true',
            startDate:'0d'
        });
    });
    var input_date= $('.input-date');
    input_date.datepicker({
        format:'yyyy/mm/dd',
        todayBtn:'linked',
        todayHighlight:'true'
    });
    input_date.datepicker("update",new Date());

});

