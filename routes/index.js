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
      "userlist" : docs,
    });
  });
});

router.get('/stuffstatu',function(req,res){
  var db = req.db;
  var collection = db.get('usercollection');
  var depts = ['处部','一科','二科','三科','四科'];
  collection.find({},{},function(e,docs){

    res.render('stuffstatu',{
      "userlist" : docs,
      "depts" : depts
    });
  });
});

router.get('/newuser',function(req,res){
  res.render('newuser',{title:'Add New User'});
});

router.post('/adduser',function(req,res){
  var db = req.db;
  var userName = req.body.username;
  var userPhone = req.body.phone;
  var dept = req.body.dept;
  var collection = db.get('usercollection');

  collection.insert(
      {
        "dept":dept,
        "username":userName,
        "phone" : userPhone
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

module.exports = router;