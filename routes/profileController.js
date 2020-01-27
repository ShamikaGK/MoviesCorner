var express = require('express');
var app = module.exports = express();
var router = express.Router();
var validator=require('express-validator');
router.use(validator());
var itemDb = require('../utility/ItemDB');
var userDb = require('../utility/UserDB');
var User = require('../models/User');
var userProfile = require('../models/UserProfile');
var userItem = require('../models/UserItem');
var session = require('express-session');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var cookieParser = require ('cookie-parser');
app.use (cookieParser());
app.use (session ({secret : "Alohomora"}));

var user = null;
var user_Prof = null;

// router.use(function getSess(req, res, next){
//   if(req.session.theUser){
//     var sessionUser = req.session.theUser;
//     user = new User(
//       sessionUser.userId,
//       sessionUser.firstName,
//       sessionUser.lastName,
//       sessionUser.email,
//       sessionUser.address,
//       sessionUser.city,
//       sessionUser.state,
//       sessionUser.zip,
//       sessionUser.country
//     );
//
//     var sessionUserProf = req.session.user_Prof;
//
//     user_Prof = new userProfile(sessionUserProf.userId);
//
//     for (let i=0; i< sessionUserProf.user_ItemList.length; i++){
//       var user_item = new userItem(
//         sessionUserProf.user_ItemList[i].itemCode,
//         sessionUserProf.user_ItemList[i].itemName,
//         sessionUserProf.user_ItemList[i].catalogCategory,
//         sessionUserProf.user_ItemList[i].rating,
//         sessionUserProf.user_ItemList[i].watched
//       );
//       user_Prof.addItem(user_item.userId, user_item);
//     }
//   }
//   else {
//     user = null;
//     user_Prof = null;
//   }
//   next();
// });

router.get('/login', function(req, res, next){

      var data= {
          title:'Login',
          path: req.url,
      }
    res.render('login', {data: data});
})

// router.post('/login', async function(req, res){
//
// //  if (req.session.theUser){
//     console.log('User logged in');
//   //   var userItemList = await userDb.getAllUserItems();
//   //   var data = {
//   //       title: 'My Movies',
//   //       path: req.url,
//   //       user: req.session.theUser,rs
//   //       user_Prof: req.session.user_Prof,
//   //       userItemList: userItemList
//   //     }
//   //   res.render('myItems', {data: data});
//   // } else {
//     var user_Prof = userDb.getUserProfile();
//     users = await userDb.getAllUsers();
//     var user = users[0];
//     var userItemList = await userDb.getAllUserItems();
//     // console.log('Userlist me se :'+userItemList[0]._doc.itemName);
// //    req.session.theUser = user;
// //    req.session.user_Prof = userDb.getUserProfile(user.userId);
//     var data = {
//         title: 'My Movies',
//         path: req.url,
//         user: user,
//        user_Prof: user_Prof,
//         userItemList: userItemList
//       }
//       console.log("Checking Login: ",data.userItemList[0]._doc.itemName)
//     res.render('myItems', {data: data});
// //  }
// });

router.post('/login', async function(req, res){
	req.check('username', 'Invalid username format').isEmail().normalizeEmail();
//	req.check('password', 'Invalid password format').isAlphanumeric();
	var errors = req.validationErrors();
	var data = {
		title: 'Login',
        path: req.url
	}
	if(errors){
		res.render('login', {errors: errors, data: data});
	}
	else{
		var username = req.body.username;
		var password = req.body.password;
		var user = await userDb.getUser(username, password);
    console.log("got user", user);
	//	userPromise.then(async function(user){
			if (user){
				req.session.theUser = user;
				//userItemPromise = await userDb.getUserItems(user.userId);
        userItems = await userDb.getUserItems(user._doc.userId);
				//userItemPromise.then(function(userItems){
					req.session.userItems = userItems;
					req.session.theUser.successMsg = true;
          console.log("UserItem list, ", userItems);
					var data = {
						title: 'My Movies',
						path: req.url,
						user: req.session.theUser,
						//user_Prof: user_Prof,
						userItemList: userItems
					}
				console.log("Checking Login: ",data.userItemList[0]._doc.itemName)
			//	res.render('myItems', {data: data});
        res.redirect('/myItems');
			//	})
			}
		// })
    // .catch(function(error){
		// 	var errors =[];
		// 	var error = {};
		// 	error.msg = "Username or Password is wrong. Please try again.";
		// 	errors.push(error);
		// 	res.render('login', {errors: errors, data: data});
		// })
	}
});

router.post('/myItems/:user/:itemName', async function(req, res, next){
// console.log(req.body.rating)
//  var user_Prof = req.session.user_Prof;
// var user_Prof = userDb.getUserProfile();
// users = await userDb.getAllUsers();
// var user = users[0];
// var userItemList = await userDb.getAllUserItems();
var user = req.session.theUser;
var userItemList = req.session.userItems;
  for (let i = 0; i<userItemList.length; i++){
    if(userItemList[i].itemName == req.params.itemName){
      console.log("Inside if cond")
      // user_Prof.user_ItemList[i]._rating = parseInt(req.body.rating)
    }
  }
console.log(user_Prof)
  var data = {
    title: 'My Movies',
    path: req.url,
    user: user,
  //  user_Prof: user_Prof,
    userItemList: userItemList
  }
  console.log("After Updating")
  // res.render('myItems', {data: data});
});

router.get('/myItems/delete/:itemName', async function(req, res, next){
//  var user_Prof = req.session.user_Prof;
// var user_Prof = userDb.getUserProfile();
// users = await userDb.getAllUsers();
// var user = users[0];
// var userItemList = await userDb.getAllUserItems();
var user = req.session.theUser;
var userItemList = await userDb.getUserItems(user.userId);
//var userItemList = req.session.userItems;
console.log("UserItemList in delete, ", userItemList);
console.log("UserItemList 1 in delete, ", userItemList[0].itemName);
//var userItemList;
  for (let i = 0; i<userItemList.length; i++){
    if(userItemList[i].itemName == req.params.itemName){
      console.log("Inside Removing condintion")
      var tempuserList = await userDb.removeItem(user.userId,userItemList[i].itemCode)
    //  var userItemList = await userDb.getAllUserItems();

    var userItems = await userDb.getUserItems(user.userId);
//    userItemPromise.then(function(userItems){
      userItemList = userItems;
      req.session.userItems = userItems;
  //  })
    }
  }

  var data = {
    title: 'My Movies',
    path: req.url,
    user: user,
//    user_Prof: user_Prof,
    userItemList: userItemList
  }
  res.render('myItems', {data: data});
});

router.get('/myItems/add/:itemName', async function(req, res, next){
// console.log("Inside ADD function");
//  var user_Prof = req.session.user_Prof;
//  items = itemDb.getItems();
// var user_Prof = userDb.getUserProfile();
// users = await userDb.getAllUsers();
// var user = users[0];
var user = req.session.theUser;
var userItemList = req.session.userItems;
console.log("User is ", user);
console.log("Useritemlist is ," , userItemList[0].itemName);
console.log("User id is, ", user.userId);
//var userItemList = req.session.theUser.userItems;
// var userItemList = await userDb.getAllUserItems();

var items = await itemDb.getAllItems();

  for (let i=0; i<items.length; i++){
    if (items[i]._doc.itemName === req.params.itemName){
      console.log("Inside ADD if");
      var tempUserdata = await userDb.addItem(user.userId,items[i]._doc.itemCode,items[i]._doc.itemName,
        items[i]._doc.catalogCategory,items[i]._doc.rating,true);
      // user_Prof.userItemList.push(items[i]);
      //var userItemList = await userDb.getAllUserItems();

      var userItems = await userDb.getUserItems(user.userId);
  //    userItemPromise.then(function(userItems){
        userItemList = userItems;
        req.session.userItems = userItems;
        console.log("useritems display karu, ", userItems);
    //  })
    }
  }
  var data = {
    title: 'My Movies',
    path: req.url,
    user: user,
    //user_Prof: user_Prof,
    userItemList: userItemList
  }
  console.log("data me ka useritemlist ", data.userItemList.length);
  // console.log("Dtata checking for adding")
  res.render('myItems', {data: data});
});

router.get('/categories/item/save/:itemName', async function(req, res){
//  if (req.session.theUser){
//    var item = itemDb.getItem(req.params.itemCode);
  var itema = 'this';
  var allitems = await itemDb.getAllItems();
  allitems.forEach(function (item) {
    if( req.params.itemName === item._doc.itemName){
      console.log('item is '+item);
     itema = item;
    }
  });
    var user = req.session.theUser;
    var useritem = new userItem(
      user.userId,
      item.itemCode,
      item.itemName,
      item.catalogCategory,
      0,
      false
    );
    req.session.userItems.push(useritem);
    res.redirect('/myItems');
  // } else {
  //   res.redirect('/categories/item/'+req.params.itemCode );
  // }
});

router.get('/logout', function(req, res){
  if (req.session.theUser){
    req.session.theUser = undefined;
    res.redirect('/');
  }
});

module.exports = router;
