/**
 * Created by loketa on 9/14/16.
 */

$(function () {
    $('#id_staffTree').on("changed.jstree",function(e,data){
        if(data.selected.length){
           window.location=data.node.a_attr.href;
        }
    })
    .jstree();
});