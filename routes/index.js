module.exports = function(db){
  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  router.get('/', function(req, res, next) {
db.ref('survey/').once('value').then(function(shot){
 
 
  var named = shot.val();
  


res.render('index',{
  name: named
  });
});
});



  router.post('/', function(req, res) {
  });

  

  router.post('/setSurvey', function(req, res, next) {
    console.log(req.body);
    var name = req.body;


    if(name.userid == "")
    {
         db.ref('users/').child(name.userid).child(name.nickname).remove();
    }
    else
    {
         db.ref('users/').child(name.userid).child(name.nickname).set(name.userid);
        
    }
res.send
    res.end('{"success" : "Updated Successfully", "status" : 200}');

});

//    res.render('index', { title:req.query.title });
  return router;

};
