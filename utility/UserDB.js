var User = require('../models/User');
var UserProfile = require('../models/UserProfile');
var itemDB = require('./itemDB');
var userDb = require('./UserDB');
var UserItem = require('../models/UserItem');
var Item = require('../models/Item');

module.exports.getAllUsers = function getAllUsers(){
  return new Promise((resolve, reject) => {
    User.find({}).then(data => {
      resolve(data);
    }).catch(err => { return reject(err); })
  })
};

module.exports.getUser = async function getUser(username, password){
   var users = await userDb.getAllUsers();
   console.log("Users are ", users);
   console.log("Email of user 1 ",users[0]._doc.email);
   var user;
   for (let i = 0; i<users.length; i++){
     if(users[i]._doc.email == username){
    //   if(users[i]._doc.password == password){
       user = users[i];
       console.log("Inside if of getUser");
    // }
   }}
    console.log("User is ", user._doc.firstName);
    return user;
  };

// module.exports.getUser = function getUser(username, password){
//   return new Promise((resolve, reject) => {
//     User.findOne({ email : username, password : password}, function(err, data){
//       console.log("In getUser ")
//   //    $and: [{ firstName: fname }, { lastName: lname }]
// }).then(data => {
//       resolve(data);
//     }).catch(err => {
//       return reject(err);
//     })
//   });
// }

// module.exports.getUser = function(userId){
//   return new Promise((resolve, reject) => {
//     User.find({ userId : userId
//   //    $and: [{ firstName: fname }, { lastName: lname }]
//     }).then(data => {
//       resolve(data);
//     }).catch(err => {
//       return reject(err);
//     })
//   });
// }

module.exports.getAllUserItems = function getAllUserItems(){
  return new Promise((resolve, reject) => {
    UserItem.find({}).then(data => {
      // console.log("in find all " + data);
      resolve(data);
    }).catch(err => { return reject(err); })
  })
};

module.exports.getUserItems = async function getUserItems(userId){
	var userItemLists = await userDb.getAllUserItems();
	var userItemList = [];
	for (let i = 0; i<userItemLists.length; i++){
		if(userItemLists[i]._doc.userId == userId){
			userItemList.push(userItemLists[i]);
			}}
	return userItemList;
	}


module.exports.addItem = function addItem(userId,itemCode, itemName, catalogCategory, rating, watched) {
		return new Promise((resolve, reject) => {
        UserItem.create({
				userId:userId,itemCode:itemCode,itemName:itemName,catalogCategory: catalogCategory,rating: rating,watched: watched
			}).then(data=>{
			     resolve(data)
			}).catch(err => {
				return reject(err);
			});
		})
	}
  module.exports.removeItem = function removeItem(userId,itemCode) {
  		return new Promise((resolve, reject) => {
          console.log(userId,itemCode)
          UserItem.remove({
  				userId:userId,itemCode:itemCode
  			}).then(data=>{
  			     resolve(data)
  			}).catch(err => {
  				return reject(err);
  			});
  		})
  	}

    module.exports.updateItem = function updateItem(userId,itemCode,rating,watched) {
    		return new Promise((resolve, reject) => {
            // console.log(userId,itemCode,rating,watched)
            UserItem.updateOne({
    				userId:userId,itemCode:itemCode
    			},{$set:{rating:rating,watched:watched}}).then(data=>{
    			     resolve(data)
    			}).catch(err => {
    				return reject(err);
    			});
    		})
    	}



// module.exports.getUsers = function() {
//
//     let users = [];
//     for (let i = 0; i < userlist.length; i++) {
//         let user = new User(userlist[i].userId,
//             userlist[i].firstName,
//             userlist[i].lastName,
//             userlist[i].email,
//             userlist[i].address,
//             userlist[i].city,
//             userlist[i].state,
//             userlist[i].zip,
//             userlist[i].country);
//
//         users.push(user);
//
//     } // end of for
//     return users;
//
//     // return data;
// };
//
// /**
//  *
//  * @param userId
//  * @returns {*}
//  */
// module.exports.getUser = function (userId) {
//     console.info("from DB, user ID :" + userId)
//     for (var i = 0; i < userlist.length; i++) {
//         // var itemCode = data.itemCode;
//         console.log("User Data" + JSON.stringify(userlist[i].firstName));
//         if (parseInt(userlist[i].userId) == userId) {
//             console.log("Inside if");
//             let user = new User(userlist[i].userId,
//                 userlist[i].firstName,
//                 userlist[i].lastName,
//                 userlist[i].email,
//                 userlist[i].address,
//                 userlist[i].city,
//                 userlist[i].state,
//                 userlist[i].zip,
//                 userlist[i].country);
//
//
//             console.log("User "+JSON.stringify(user));
//
//             return user;
//         }
//         // console.log("Data"+i);
//
//     }
// };

// var userlist = [
//     {
//         userId: "U101",
//         firstName: "Laksh",
//         lastName: "Tandon",
//         email: "lakshtandon27@gmail.com",
//         address: "12006, Apartment G",
//         city: "Charlotte",
//         state: "North Carolina",
//         zip: 28262,
//         country: "United States",
//     },
//
//     {
//         userId: "U102",
//         firstName: "Siddharth",
//         lastName: "Khanna",
//         email: "sidkhanna28@gmail.com",
//         address: "1701, Apartment 15001, Terrace Heights",
//         city: "Mumbai",
//         state: "Maharashtra",
//         zip: 400620,
//         country: "India",
//     },
// ];

var users;
var userls;
var uitems;

var getdata = async function(){
  users = await userDb.getAllUsers();
  userls = await userDb.getAllUserItems();
  console.log('User id : '+ users[0]._doc.userId);
  // console.log('UserItem list ' + userls);
  // uitems = [
  //   {
  //       userId: users[0]._doc.userId,
  //       user_ItemList: [
  //       {  itemCode: userls[0]._doc.userId,
  //   //      itemName:itemDB.getItem(11001).itemName,
  //   //      category:itemDB.getItem(11001).catalogCategory,
  //         rating:5,
  //         watched:false)
  //       },
  //       {
  //         itemCode:12001,
  // //        itemName:itemDB.getItem(12001).itemName,
  // //        category:itemDB.getItem(12001).catalogCategory,
  //         rating:4,
  //         watched:false
  //       }
  //     ]
  //   }
  // ];
  uitems = [
    {
        userId: users[0]._doc.userId,
        user_ItemList: userls
    }
  ];
  // console.log('uitems ' + uitems);
  return uitems;
}




module.exports.getUserProfile = async function getUserProfile(){
  // console.log("Inside UserDB getProfile",uitems[0]);
  var uitems = await getdata();
  userId='U101'
  for (var i = 0; i < uitems.length; i++) {
               if (uitems[i].userId === userId) {
               var userProfile = new UserProfile(uitems[i].userId);
               for (var j=0; j < uitems[i].user_ItemList.length; j++){
                   var userItem = new UserItem(
                   uitems[i].user_ItemList[j].itemCode,
                   uitems[i].user_ItemList[j].itemName,
                   uitems[i].user_ItemList[j].catalogCategory,
                   uitems[i].user_ItemList[j].rating,
                   uitems[i].user_ItemList[j].watched
                 );

               userProfile.addItem(userItem);
           }
           console.log("getting userprofile",userProfile);
           console.log('UserProfile issssss '+userProfile );
           return userProfile;
       }
   }
};
