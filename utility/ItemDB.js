var Item = require('../models/Item');
var Items = require('../models/Item');

module.exports.getAllItems = function (){
  return new Promise((resolve, reject) => {
    Items.find({}).then(data => {
      // console.log("in find all " + data);
      // console.log("in find all2 " + data[0]);
      resolve(data);
    }).catch(err => { return reject(err); })
  })
};

module.exports.getItem = function(itemName){
  return new Promise((resolve, reject) => {
    Items.find({itemName: itemName
  //    $and: [{ firstName: fname }, { lastName: lname }]
    }).then(data => {
      resolve(data);
    }).catch(err => {
      return reject(err);
    })
  });
}

// module.exports.getItems = function () {
//
//     let items = [];
//     for (let i = 0; i < data.length; i++) {
//         let item = new Item(data[i].itemCode,
//             data[i].itemName,
//             data[i].catalogCategory,
//             data[i].cast,
//             data[i].director,
//             data[i].description,
//             data[i].rating,
//             data[i].imgUrl);
//
//         items.push(item);
//
//     } // end of for
//     return items;
//
//     // return data;
// };
//
// /**
//  *
//  * @param itemCode
//  * @returns {*}
//  */
// module.exports.getItem = function (itemCode) {
//     // console.info("from DB, Item code :" + itemCode)
//     for (var i = 0; i < data.length; i++) {
//         // var itemCode = data.itemCode;
//         // console.log("Data" + JSON.stringify(data[i].imgUrl));
//         if (parseInt(data[i].itemCode) == itemCode) {
//             // console.log("Inside if");
//             let item = new Item(data[i].itemCode,
//                 data[i].itemName,
//                 data[i].catalogCategory,
//                 data[i].cast,
//                 data[i].director,
//                 data[i].description,
//                 data[i].rating,
//                 data[i].imgUrl
//                 )
//
//             // console.log("Item"+JSON.stringify(item));
//
//             return item;
//         }
//         // console.log("Data"+i);
//
//     }
// };

// Hard coded data
var data = [
    {
        itemCode: 11001,
        itemName: "Harry Potter and the Sorceror's Stone",
        catalogCategory: "Fantasy",
        cast: "Daniel Radcliffe, Emma Watson, Rupert Grint",
        director: "Chris Columbus",
        description: "Adaptation of the first of J.K. Rowling's popular novels, Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his life as an unwanted child to become a student at Hogwarts, an English boarding school for wizards. There, he meets several friends who become his closest allies and help him discover the truth about his parents' mysterious deaths.",
        rating: 5,
        imgUrl: "/images/hp1.jpg",

    },
    {
        itemCode: 11002,
        itemName: "The Chronicles of Narnia: Prince Caspian",
        catalogCategory: "Fantasy",
        cast: "Ben Barnes, Georgie Henley, Skandar Keynes, William Moseley, Anna Popplewell",
        director: "Andrew Adamson",
        description: "One year after their previous adventure, the Pevensie children (Georgie Henley, Skandar Keynes, William Moseley, Anna Popplewell) return to the magical land of Narnia and find that 1300 years have passed there. War has come to Narnia once again, and the children join forces with Prince Caspian (Ben Barnes) to overthrow the evil King Miraz and restore peace to the land.",
        rating: 4,
        imgUrl: "/images/pc1.jpg",
    },


    {
        itemCode: 11003,
        itemName: "Prince of Persia: The Sands of Time",
        catalogCategory: "Fantasy",
        cast: "Jake Gyllenhaal, Gemma Arterton",
        director: "Mike Newell",
        description: "In the holy city of Alamut resides the Sands of Time, which gives mortals the power to turn back time. After leading an attack on the city, Dastan (Jake Gyllenhaal), the adopted son of Persia's king, acquires a dagger that gives the one who holds it access to the Sands. Dastan goes on the run with an Alamut princess named Tamina (Gemma Arterton) after being accused of killing his father. The pair must protect the ancient treasure from dark forces and unmask the king's assassin.",
        rating: 3,
        imgUrl: "/images/pp1.jpg",
    },


    {
        itemCode: 12001,
        itemName: "Knight and Day",
        catalogCategory: "Action",
        cast: "Tom Cruise, Cameron Diaz, Peter Sarsgaard, Jordi Mollà",
        director: "James Mangold",
        description: "June Havens (Cameron Diaz) chats up her charming seatmate on a flight out of Kansas, but she doesn't realize that she will soon land in the middle of an international adventure. The fellow passenger, Roy Miller (Tom Cruise), is a covert operative who claims he has been set up to take a fall. Now his reluctant partner, June must dodge bullets in Boston, leap rooftops in Austria and evade bulls in Spain, while she and Roy learn that trust is the most important survival skill.",
        rating: 4,
        imgUrl: "/images/knd1.jpg",
    },

    {
        itemCode: 12002,
        itemName: "Fast Five",
        catalogCategory: "Action",
        cast: "Vin Diesel, Paul Walker, Dwayne Johnson, Jordana Brewster",
        director: "Justin Lin",
        description: "Ever since ex-cop Brian O'Conner (Paul Walker) and Mia Torretto (Jordana Brewster) broke her brother Dom (Vin Diesel) out of custody, they've traveled border to border to evade authorities. In Rio de Janeiro, they must do one final job before they can gain their freedom for good. Assembling their elite team of car racers, Brian and Dom know they must confront the corrupt businessman who wants them dead, before the federal agent (Dwayne Johnson) on their trail finds them.",
        rating: 5,
        imgUrl: "/images/fnf1.jpg",
    },

    {
        itemCode: 12003,
        itemName: "Mission Impossible 2",
        catalogCategory: "Action",
        cast: "Tom Cruise, Thandie Newton, Dougray Scott",
        director: "John Woo",
        description: "Tom Cruise returns to his role as Ethan Hunt in the second installment of Mission: Impossible. This time Ethan Hunt leads his IMF team on a mission to capture a deadly German virus before it is released by terrorists. His mission is made impossible due to the fact that he is not the only person after samples of the disease. He must also contest with a gang of international terrorists headed by a turned bad former IMF agent who has already managed to steal the cure.",
        rating: 3,
        imgUrl: "/images/mi2.jpg",
    },

	{
        itemCode: 12004,
        itemName: "Speed",
        catalogCategory: "Action",
        cast: "Keanu Reeves, Sandra Bullock, Dennis Hopper, Jeff Daniels",
        director: "Jan de Bont",
        description: "Los Angeles police officer Jack (Keanu Reeves) angers retired bomb squad member Howard Payne (Dennis Hopper) by foiling his attempt at taking hostages. In revenge, Payne arms a bus with a bomb that will explode if it drops below 50 miles per hour. With the help of spunky passenger Annie (Sandra Bullock), Jack and his partner Harry (Jeff Daniels) try to save the people on the bus before the bomb goes off, while also trying to figure out how Payne is monitoring them.",
        rating: 4,
        imgUrl: "/images/sp1.jpg",
    },

];

var category = ["Fantasy", "Action"];
