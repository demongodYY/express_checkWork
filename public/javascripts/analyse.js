/**
 * Created by loketa on 9/22/16.
 */

$(document).ready(function () {
   $("button#id_query_statu").click(function(){
       var postData = $("form#date_post").serialize();
       $.post("/getstatu",postData,function(data,status){
           var table = $("table.staff-statu-list");
           $("tr.tr-content").remove();
           for(var i = 0;i<data.length;i++){
               var trStatu = "<tr class='text-center tr-content'>";
               trStatu += "<td>"+data[i].dept+"</td>";
               trStatu += "<td>"+data[i].username+"</td>";
               trStatu += "<td>"+data[i].phone+"</td>";
               if(data[i].events==undefined){
                   trStatu += "<td>"+"normal"+"</td>";
               }
               else{
                   var tbStatu = "";
                   for(var j=0; j<data[i].events.length;j++)
                   {
                       tbStatu+= data[i].events[j].event;
                   }
                   trStatu += "<td>"+tbStatu+"</td>";
               }
               trStatu += "</tr>";
               $("table.staff-statu-list tbody").append(trStatu);
           }
       });
   }).click();
});