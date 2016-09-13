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
      "userlist" : docs
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

  var collection = db.get('usercollection');

  collection.insert(
      {
        "username":userName,
        "phone" : userPhone
      },function(err,doc){
        if(err){
          res.send("adding failed!");
        }
        else{
          res.location("userlist");
          res.redirect("userlist");
        }
      }
  );
});

module.exports = router;
