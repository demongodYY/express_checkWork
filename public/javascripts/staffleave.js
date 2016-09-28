/**
 * Created by loketa on 9/28/16.
 */

var setEndtimeBegin = function(id_startTime,id_EndTime){
    var startDate = $(id_startTime).datepicker('getDate');
    $(id_EndTime).datepicker('setStartDate',startDate);
};

var setEndtimeEnd = function(id_startTime,id_EndTime){
    var vecationDays = parseInt($('[name="staffId"]').find("option:selected").attr("vecation"));
    var startDate= $(id_startTime).datepicker('getDate');
    var endDate = startDate;
    endDate.setDate(startDate.getDate()+vecationDays);
    if (vecationDays!=undefined){
        $(id_EndTime).datepicker('setEndDate',endDate);
    }
};


$(document).ready(function () {
    $('[name="staffId"]').change(function(){
        $('#begin-date').datepicker("setDate" , new Date());
    });
    $('#begin-date').on('changeDate',function(e){
        setEndtimeBegin("#begin-date","#end-date");
        setEndtimeEnd("#begin-date","#end-date");
        $('#end-date').datepicker("clearDates");
    });
});