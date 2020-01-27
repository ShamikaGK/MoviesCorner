var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/MoviesCorner', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
      //  server.start();
        console.log('Connected to Server successfully!');
    }
});

var itemSchema = mongoose.Schema({
  _itemCode : Number,
  _itemName : String,
  _catalogCategory : String,
  _cast : String,
  _director : String,
  _description : String,
  _rating : Number,
  _imgUrl : String
},{collection:'Items'});


module.exports = mongoose.model('Items', itemSchema);

// class Item {
//     /**
//      * Constructor
//      * @param itemCode
//      * @param itemName
//      * @param catalogCategory
//      * @param cast
// 	   * @param director
//      * @param description
//      * @param rating
//      * @param imageURL
//      */
//     constructor(itemCode, itemName, catalogCategory, cast, director, description, rating, imageURL) {
//         this._itemCode = itemCode;
//         this._itemName = itemName;
//         this._catalogCategory = catalogCategory;
//         this._cast = cast;
//         this._director = director;
//         this._description = description;
//         this._rating = rating;
//         this._imageURL = imageURL;
//     }
//
//
//     /**
//      *
//      * Getter and Setters
//      */
//
//
//     get cast() {
//         return this._cast;
//     }
//
//     set cast(value) {
//         this._cast = value;
//     }
//
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
//     get director() {
//         return this._director;
//     }
//
//     set director(value) {
//         this._director = value;
//     }
//
//     get description() {
//         return this._description;
//     }
//
//     set description(value) {
//         this._description = value;
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
//     get imageURL() {
//         return this._imageURL;
//     }
//
//     set imageURL(value) {
//         this._imageURL = value;
//     }


//}

//module.exports = Item;
