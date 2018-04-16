var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var mongoose = require('mongoose');
var RoomDateModel = require('../models/RoomDate')


var listener = {};



// restrict index for logged in user only
router.get('/', auth.home);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);


router.post('/addmeeting',function(req, res) {

    var data = new RoomDateModel({
    username: req.user.username,
    day: req.body.day,
    dateInit: req.body.initTime,
    dateEnd: req.body.endTime});  

 	
 	var init = req.body.initTime;
	var end = req.body.endTime;

	console.log(String(req.body.day + " "+req.body.initTime))
	console.log(String(req.body.day + " "+req.body.endTime))

	if (init > end) {
		console.log("Hora de inicio deve ser antes da final");
		// popup.alert('Hora de inicio deve ser antes da final');
		res.redirect('/');
	} else { //validate conflicts
	 		RoomDateModel.find({day :req.body.day}).lean().exec(function (e, docs) {
	            console.log("results validate", docs)
	            if (docs.length == 0) {
	            	data.save().then(console.log("success")); 
					res.redirect('/');
	            } else { 
					for (var i = 0; i < docs.length; i++) {
					    var meeting = docs[i];

						initMeeting = meeting.dateInit;
						endMeeting = meeting.dateEnd;

						if (init < initMeeting && endMeeting <= initMeeting) {
							data.save().then(console.log("success")); 
							// res.json({success:true})
							res.redirect('/');
						} else if (endMeeting <= init) {
							data.save().then(console.log("success")); 
							// res.json({success:true})
							res.redirect('/');
						} else {
							console.log({success:false, msg:"Sala ja esta ocupada neste horario"})
							res.redirect('/');
							// popup.alert("Sala ja esta ocupada neste horario");
						}
					    // ...
					}
				}


	     });
	}

    // res.redirect('/');
});

router.post('/searchdate', function(req, res) {
	console.log("---SEARCHDATE---")
    console.log(req.body)
    RoomDateModel.find({day :req.body.searchday}).lean().exec(
        function (e, docs) {
          console.log({ "roomsDate": docs, user : req.user})
          res.render('listbyday', { "roomsDate": docs, user : req.user, searchday : req.body.searchday});
     });

});


module.exports = router;