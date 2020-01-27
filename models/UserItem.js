var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/MoviesCorner', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
      //  server.start();
        console.log('Connected to Server successfully!');
    }
});

var userItemSchema = mongoose.Schema({
  userId : String,
  itemCode : Number,
  itemName : String,
  catalogCategory : String,
  rating : Number,
  watched : Boolean
},{collection:'UserItems'});


module.exports = mongoose.model('UserItems', userItemSchema);

// class UserItem {
//     /**
//      * Constructor
//      * @param itemCode
//      * @param itemName
//      * @param catalogCategory
//      * @param rating
//      * @param watched
//      */
//     constructor(itemCode, itemName, catalogCategory, rating, watched) {
//         this._itemCode = itemCode;
//         this._itemName = itemName;
//         this._catalogCategory = catalogCategory;
//         this._rating = rating;
//         this._watched = watched;
//     }
//
//
//     /**
//      *
//      * Getter and Setters
//      */
//     get itemCode() {
//         return this._itemCode;
//     }
//
//     set itemCode(value) {
//         this._itemCode = value;
//     }
//
//     get itemName() {
//         return this._itemName;
//     }
//
//     set itemName(value) {
//         this._itemName = value;
//     }
//
//     get catalogCategory() {
//         return this._catalogCategory;
//     }
//
//     set catalogCategory(value) {
//         this._catalogCategory = value;
//     }
//
//     get rating() {
//         return this._rating;
//     }
//
//     set rating(value) {
//         this._rating = value;
//     }
//
//     get watched() {
//         return this._watched;
//     }
//
//     set watched(value) {
//         this._watched = value;
//     }
//
// }
//
// module.exports = UserItem;
