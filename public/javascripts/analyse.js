/**
 * Created by loketa on 9/22/16.
 */

var setStatus=function(userId,userEvent){
    var userIdInput = $("input[value="+userId+"]");
    if(userEvent!="overtime"&&userEvent!="normal"){
        userIdInput.siblings("span.normal").addClass("disActive");
    }
    userIdInput.siblings("span."+userEvent).removeClass("disActive");
};

var refreshStatus=function(){
    $("td.staffStatu span.label").addClass("disActive");
    $("td.staffStatu span.label.normal").removeClass("disActive");
};



$(document).ready(function () {
   $("button#id_query_statu").click(function(){
       var postData = $("form#date_post").serialize();
       $.post("/getstatu",postData,function(data,status){
           refreshStatus();
           for (var i = 0;i<data.length;i++){
               var userId = data[i]._id;
               var userEvents = data[i].events;
               if(userEvents.length==0){
                   setStatus(userId,"normal");
               }
               else{
                   for(var j=0;j<userEvents.length;j++){
                       setStatus(userId,userEvents[j]);
                   }
               }
           }
       });
   }).click();
});