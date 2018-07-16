
module.exports = function(db){

    var express = require('express');
    var router = express.Router();



    /* GET home page. */
    router.get('/', function(req, res, next) {

        console.log('survey.js');

    });
    router.get('/cs1', function(req, res, next) {
        console.log('cs1');
        initSurvey(req, res);

    });
    router.get('/cs2', function(req, res, next) {
        console.log('cs2');
        initSurvey(req, res);

    });
    router.get('/cs3', function(req, res, next) {
        console.log('cs3');
        initSurvey(req, res);

    });
    router.get('/cs4', function(req, res, next) {
        console.log('cs4');
        initSurvey(req, res);

    });

    router.get('/cs5', function(req, res, next) {
        console.log('cs5');
        initSurvey(req, res);
    });
    router.get('/cs6', function(req, res, next) {
        console.log('cs6');
        initSurvey(req, res);

    });
    router.get('/cs7', function(req, res, next) {
        console.log('cs7');
        initSurvey(req, res);

    });
    router.get('/cs8', function(req, res, next) {
        console.log('cs8');
        initSurvey(req, res);

    });
    router.get('/cs9', function(req, res, next) {
        console.log('cs9');
        initSurvey(req, res);

    });
    router.get('/cs10', function(req, res, next) {
        console.log('cs10');
        initSurvey(req, res);

    });
    router.get('/cs11', function(req, res, next) {
        console.log('cs11');
        initSurvey(req, res);

    });
    router.get('/cs12', function(req, res, next) {
        console.log('cs12');
        initSurvey(req, res);

    });
    router.get('/cs13', function(req, res, next) {
        console.log('cs13');
        initSurvey(req, res);

    });
    router.get('/cs14', function(req, res, next) {
        console.log('cs14');
        initSurvey(req, res);

    });

    router.get('/cs15', function(req, res, next) {
        console.log('cs15');
        initSurvey(req, res);
    });
    router.get('/cs16', function(req, res, next) {
        console.log('cs16');
        initSurvey(req, res);

    });
    router.get('/cs17', function(req, res, next) {
        console.log('cs17');
        initSurvey(req, res);

    });
    router.get('/cs18', function(req, res, next) {
        console.log('cs18');
        initSurvey(req, res);

    });




    function initSurvey(req,res){
       // var locale = "-ko";
        var locale =req.query.locale;
    
        var csid = req.query.csid;
        var userid =req.query.userid;
        var cid = req.query.cid;
        var array = [];

        //db.ref('survey/').child('user1').child('c1').child('cs4').once('value').then(function(snapshot) {
         db.ref('survey/').child(userid).child(cid).child(csid).once('value').then(function(snapshot) {
            console.log(snapshot.val());
         
            //  userid =snapshot.key;
         
            snapshot.forEach(function(childSnapshot) {
                var answered = {
                    qid : "",
                    answerType : "",
                    answer : "",
                };

                // var childRef = childSnapshot.ref;
                // console.log(childSnapshot.key);
                // console.log(childSnapshot.val());
                // answered.qid = childSnapshot.key;
                // console.log(childSnapshot.val().answer);
                // answered.answer = childSnapshot.val().answer;
                // answered.answerType = childSnapshot.val().answerType;
                // console.log(answered.answerType); //원래 코드
                console.log(childSnapshot.key);
                console.log(childSnapshot.val());
                answered.qid = childSnapshot.key;
                //    console.log()
                answered.answer = childSnapshot.val().answer;
                answered.answerType = childSnapshot.val().answerType;
                //    console.log()

                array.push(answered);
            });

            array.forEach(function(result){
                console.log(result.qid);
            });
            res.render(csid+locale, { nickname:req.query.nickname  , userid:userid ,cid: cid ,csid: csid,list: array});
            //res.render('cs6-ko', { nickname: "test" , userid: "testid" ,cid: "cid" ,csid: "csid",list: array});
            //res.render("cs4-ko", { nickname: " " , userid: "user1" ,cid: "c1" ,csid: req.query.csid,list: array});
        }).catch(function(error) {
            console.log('Failed to send notification to user:', error);
        });
 // res.render('cs4-ko', { nickname: "test" , userid: "testid" ,cid: "cid" ,csid: "csid",list});
      

    }

    router.post('/', function(req, res) {
    });

    router.post('/setSurvey', function(req, res, next) {
        console.log(req.body);
        var survey = req.body;
    
    
        if(survey.answer == "")
        {
             db.ref('survey/').child(survey.userid).child(survey.cid).child(survey.csid).child(survey.qid).remove();
        }
        else
        {
             db.ref('survey/').child(survey.userid).child(survey.cid).child(survey.csid).child(survey.qid).child("answerType").set(survey.answerType);
             db.ref('survey/').child(survey.userid).child(survey.cid).child(survey.csid).child(survey.qid).child("answer").set(survey.answer);
        }
    
        res.end('{"success" : "Updated Successfully", "status" : 200}');
    
    });

    return router;

};
