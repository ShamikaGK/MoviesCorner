var userDB = require('../utility/UserDB.js');
var itemDB = require('../utility/itemDB.js');

var userItem = require('./UserItem.js');




class UserProfile{

    constructor(userId){
      this.userId = userId;
      this.user_ItemList = [];
    }

    get userId() {
        return this.userId;
    }

    set userId(value){
        this.userId = value;
    }

    get userItemList(){
        return this.user_ItemList;
    }

    set userItemList(value){
        this.user_ItemList = value;
    }
    getItems(){
        return this.user_ItemList;
    }

/*
function UserProfile(UserID, UserItems){
  this.UserID = UserID;
  this.UserItems = UserItems;
}

var getUserItems = function getUserItems(UserID){
  if (UserID === "U101"){
    return UserProfile1.UserItems;
  } else {
    console.log("No match found");
  }
}
*/


addItem (item){
/*  var existing_items = getUserItems("U101");

  let c = 0;
  for (let i=0; i < existing_items.length; i++){
    if (existing_items[i].item === item){
      c++;
    }
  }
  if (c === 0){
    var UserItem3 = new UserItem("U101", item, '1', "No");
    existing_items.push(UserItem3);
  } else {
    console.log("Item already exists");
  }
  return existing_items;*/
  if(item instanceof userItem){
            this.user_ItemList.push(item);
        }else{
            console.log('Invalid Object Type')
        }
}

/*updateItem = function(useritem, rating, watched){
  var exist_item = getUserItems("U101");
  for (let i=0; i < exist_item.length; i++){
    if (exist_item[i] === useritem){
      exist_item[i].rating = rating;
      exist_item[i].watched = watched;
    } else {
      console.log("Item doesn't exist in saved list");
    }
  }
  return exist_item;
};

module.exports.removeItem = function(itemcode){
  var items = getUserItems("U101");
  var newitems = items.filter(function(itema){
    if (itemcode === itema.item.itemCode){
      return null;
    }
    return itema;
  });

  return newitems;
};

module.exports.emptyProfile = function(){
    UserProfile1.delete;*/
     updateItem(items){
            if(items instanceof userItem){
                const index = this.user_ItemList.findIndex((ex) => ex.item.itemCode === items.item.itemCode);
                if (index === -1) {
                    console.log('User Item does not exist');
                } else {
                    this.user_ItemList[index] = items;
                }
              }
            else{
                console.log('Invalid Object Type')
            }
        }


  removeItem(items){
        if(items instanceof userItem){
            this.user_ItemList.filter(function(item){
                return item!=items;
            });
        }else{
            console.log('Invalid Object Type')
        }
    }

  emptyProfile(){
        this.user_ItemList = [];
    }

}

module.exports = UserProfile;
