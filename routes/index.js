var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/helloworld', function (req,res) {
  res.render('helloworld',{title:'Hello,World!'});
});

router.get('/checkwork',function(req,res){
  var db = req.db;
  var collection = db.get('usercollection');

  collection.find({},{},function(e,docs){
    res.render('checkwork',{
      "title" : "考勤登记",
      "userlist" : docs
    });
  });
});

router.get('/staffstatu/:id',function(req,res){
  var db = req.db;
  var collection = db.get('usercollection');
  var depts = ['处部','一科','二科','三科','四科'];
  collection.find({},{},function(e1,userList){
    var userSelected = userList.find(function (element) {
      return element._id==req.params.id;
    });
    var todayLeave  = "未请假";
    var today = (new Date().toLocaleDateString());
    if (userSelected!=undefined){
      for (var i=0;i<userSelected.events.length;i++){
        var staffDay = new Date(userSelected.events[i].date).toLocaleDateString();
        if((userSelected.events[i].event=="leave")&&(today==staffDay)){
          todayLeave = "请假"
        }
      }
    }
    res.render('staffstatu',{
      "title" : "员工状态",
      "userlist" : userList,
      "userselected" : userSelected,
      "depts" : depts,
      "todayleave" : todayLeave
    });
  });
});

router.get('/staffleave',function(req,res){
  var db=req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,userList){
    res.render('staffleave',{
      "title" : "员工请假",
      "userlist" : userList
    });

  });

});

router.get('/analyse',function(req,res){
  var db= req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,userList){
    res.render('analyse',{
      "title":"数据分析",
      "userList":userList
    });
  });

});

router.get('/newuser',function(req,res){
  res.render('newuser',{
    title:'添加新员工'
  });
});

router.post('/adduser',function(req,res){
  var db = req.db;
  var userName = req.body.username;
  var userPhone = req.body.phone;
  var dept = req.body.dept;
  var userVecation = req.body.vecation;
  var collection = db.get('usercollection');
  var userEvents=[];

  collection.insert(
      {
        "dept":dept,
        "username":userName,
        "phone" : userPhone,
        "vecation" : userVecation,
        "events" : userEvents
      },function(err,doc){
        if(err){
          res.send("adding failed!");
        }
        else{
          res.location("newuser");
          res.redirect("newuser");
        }
      }
  );
});

router.post('/staffevent',function(req,res){
  var db=req.db;
  var date=new Date(req.body.date).toDateString();
  var staffEvents=req.body.staffevent;
  var collection = db.get('usercollection');
  for (var i=0;i<staffEvents.length;i++){
    var staffEvent = staffEvents[i].split('&');
    if (staffEvent[1]!="normal"){
      collection.update(
          {
            "_id" : staffEvent[0]
          },
          {
            $push :{
              "events" : {
                "event" : staffEvent[1],
                "date" : date
              }
            }
          },
          function(err){
            if(err){
              res.send("录入失败！");
            }
          }
      );
    }
  }
  res.location("checkwork");
  res.redirect("checkwork");
});

router.post('/leave',function(req,res){
  var db = req.db;
  var staffId = req.body.staffId;
  var beginDate = new Date(req.body.begindate);
  var endDate = new Date(req.body.enddate);
  var collection = db.get('usercollection');
  do{
    collection.update(
        {
          "_id" :staffId
        },
        {
          $push :{
            "events" : {
              "event" : "leave",
              "date" : beginDate.toDateString()
            }
          }
        },
        function(err){
          if(err){
            res.send("录入失败！");
          }
        }
    );
    beginDate.setDate(beginDate.getDate()+1);
  }while(beginDate<=endDate);

  res.location("staffleave");
  res.redirect("staffleave");
});

router.post('/getstatu',function(req,res){
  var db= req.db;
  var date = new Date(req.body.date).toDateString();
  var collection = db.get('usercollection');
  collection.aggregate([
    {$unwind:"$events"},
    {$match:{"events.date":{"$eq":date}}},
    {$group:{_id:"$_id","events":{$push:"$events.event"}}}
  ], function (e,doc) {
    res.send(doc);
  })
});



module.exports = router;
