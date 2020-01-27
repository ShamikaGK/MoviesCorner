var express = require('express');
var router = express.Router();
var itemDb = require('../utility/ItemDB');
var userDb = require('../utility/UserDB');
var session = require('express-session');
var User = require('../models/User');
var userItem = require('../models/UserItem');
var bodyParser = require('body-parser');
var userProfile = require('../models/UserProfile');

var user = null;
var user_Prof = null;
var app = express();
router.use(bodyParser.json());

router.use(bodyParser.urlencoded({ extended: false }));
router.use(session({secret: 'Alohamora'}));

// router.use( function getSess(req, res, next){
//   if(req.session.theUser){
//     // console.log("Inside if User",req.session.theUser)
//     var sessionUser = req.session.theUser;
//     // user = new User(
//     //   sessionUser.userId,
//     //   sessionUser.firstName,
//     //   sessionUser.lastName,
//     //   sessionUser.email,
//     //   sessionUser.address,
//     //   sessionUser.city,
//     //   sessionUser.state,
//     //   sessionUser.zip,
//     //   sessionUser.country
//     // );
//
//   //  var users = await userDb.getAllUsers();
//   //  user = users[0];
//
//     var sessionUserProf = req.session.user_Prof;
//
//     user_Prof = new userProfile(req.session.theUser._userId);
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

/* GET home page. */
router.get('/', async function(req, res, next) {
//  let itemobj = new itemDb();
//  var itemD = await itemDb.getAllItems().then( itemD => {
//  var itemD = await itemobj.getAllItems()
//  console.log(JSON.stringify(itemD['0']));
//  console.log('in home '+itemD);
//    console.log('Zeroth element : ' + itemD[1]._doc.itemCode);
//});
//  console.log("Getting all items " +itemD);
    var data= {
        title:'Home',
        path: req.url,
        user: user
    }

  res.render('index', {data: data});
});


router.get('/categories', async function(req, res, next) {

    var categories = await getCategories();
//    var itemData = itemDb.getItems();
    // console.log("Categories print "+ categories);
    var itemD = await itemDb.getAllItems();
    // console.log("Getting all items " +itemD);
    var data= {
        title:'Categories',
        path: req.url,
        categories: categories,
        items: itemD,
        user: user
    }
    res.render('categories', {data: data});
});

router.get('/categories/:categoryName', async function (req,res) {
    // get the category name
    var categories = [];
    categories.push(req.params.categoryName);
  //  var itemData = itemDb.getItems();
    var itemD = await itemDb.getAllItems();
    var data= {
        title:'Categories',
        path: req.url,
        categories: categories,
        items: itemD,
        user: user
    }
    res.render('categories', {data: data});
})

router.get('/contact', function(req, res, next) {

    var data= {
        title:'Contact Us',
        path: req.url,
        user: user
    }
    res.render('contact', {data: data});
});

router.get('/about', function(req, res, next) {

    var data= {
        title:'About Us',
        path: req.url,
        user: user
    }
    res.render('about', {data: data});
});

router.get('/categories/item/:itemName/feedback', async function(req, res, next) {
  var itemName = req.params.itemName;
//    var item = itemDb.getItem(itemCode);
    var item = await itemDb.getItem(itemName);
    users = await userDb.getAllUsers();
    var user = users[0];
    var itema = 'this';
    var allitems = await itemDb.getAllItems();
    allitems.forEach(function (item) {
      // console.log('print for one item '+item);
      //     console.log('item is '+item._doc.itemName);
      //     console.log('request ' + req.params.itemName);
      if( req.params.itemName === item._doc.itemName){
        // console.log('item is '+item);
       itema = item;
      }
    });
    var data= {
        title:'Feedback',
        path: req.url,
        user: user,
        user_Prof: user_Prof,
        item: itema
    }

    res.render('feedback', {data: data});
});

router.get('/categories/item/:itemName', async function(req, res, next) {
    var itemName = req.params.itemName;
    // console.log("Item Name:"+itemName);
  //  if (itemDb.isExist(itemCode)){
  //    var item = itemDb.getItem(itemCode);
  //  var item = await itemDb.getItem(itemName);
  //  var itemo = item.;
    // console.log('In item '+item);
    // console.log('In item '+typeof item);
    //   console.log(item.catalogCategory);
var itema = 'this';
var allitems = await itemDb.getAllItems();
allitems.forEach(function (item) {
  // console.log('print for one item '+item);
  //     console.log('item is '+item._doc.itemName);
  //     console.log('request ' + req.params.itemName);
  if( req.params.itemName === item._doc.itemName){
    // console.log('item is '+item);
   itema = item;
  }
});
// console.log('getting item a ' + itema);
// console.log('items name '+itema._doc.itemName);
      var data= {
          title:'Item',
          path: req.url,
          item: itema,
          user: user
      }
      res.render('item', {data: data});
//    } else {
  //    res.redirect('/categories');
  //  }
});

router.get('/myItems', function(req, res, next) {
    var userItemList;
    var data= {
        title:'My Items',
        path: req.url,
        user: req.session.theUser,
        userItemList: req.session.userItems
    }
    res.render('myItems', {data: data});
});

var categories = [];

let getCategories = async function() {
    // get the category of each item
//    var data = itemDb.getItems();
    var data = await itemDb.getAllItems();
    console.log('In categories ');
  //  data.forEach(function (item) {
      for (let i=0 ; i<data.length; i++){
        var item = data[i];
  //    console.log('Print each item '+ item);
  //    console.log('Item catalog category '+ item.catalogCategory);
  //    console.log('Item catalog category '+ item);
        if(!categories.includes(item._doc.catalogCategory)){

            categories.push(item._doc.catalogCategory);
        }
 }
//    });
    // console.log('Returning categories '+categories);
    return categories;
};

module.exports = router;
