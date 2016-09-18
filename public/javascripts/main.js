/**
 * Created by loketa on 9/18/16.
 */

$(document).ready(function () {
   $(".btn-clickable").click(function(){
       if($(this).hasClass("active")){
            $(this).removeClass("active");
       }
       else{
           $(this).addClass("active");
           //alert("123");
       }
   });
});