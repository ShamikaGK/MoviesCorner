var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/MoviesCorner', function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
      //  server.start();
        console.log('Connected to Server successfully!');
    }
});

var userSchema = mongoose.Schema({
  _userId : String,
//  _username : String,
  _password : String,
  _firstName : String,
  _lastName : String,
  _email : String,
  _address : String,
  _city : String,
  _state : String,
  _zip : Number,
  _country : String
},{collection:'Users'});


module.exports = mongoose.model('Users', userSchema);


// class User {
//     /**
//      * Constructor
//      * @param userId
//      * @param firstName
//      * @param lastName
//      * @param email
// 	   * @param address
//      * @param city
//      * @param state
//      * @param zip
//      * @param country
//      */
//     constructor(userId, firstName, lastName, email, address, city, state, zip, country) {
//         this._userId = userId;
//         this._firstName = firstName;
//         this._lastName = lastName;
//         this._email = email;
//         this._address = address;
//         this._city = city;
//         this._state = state;
//         this._zip = zip;
//         this._country = country;
//     }
//
//
//     /**
//      *
//      * Getter and Setters
//      */
//
//
//     get email() {
//         return this._email;
//     }
//
//     set email(value) {
//         this._email = value;
//     }
//
//     get userId() {
//         return this._userId;
//     }
//
//     set userId(value) {
//         this._userId = value;
//     }
//
//     get firstName() {
//         return this._firstName;
//     }
//
//     set firstName(value) {
//         this._firstName = value;
//     }
//
//     get lastName() {
//         return this._lastName;
//     }
//
//     set lastName(value) {
//         this._lastName = value;
//     }
//
//     get address() {
//         return this._address;
//     }
//
//     set address(value) {
//         this._address = value;
//     }
//
//     get city() {
//         return this._city;
//     }
//
//     set city(value) {
//         this._city = value;
//     }
//
//     get state() {
//         return this._state;
//     }
//
//     set state(value) {
//         this._state = value;
//     }
//
//     get zip() {
//         return this._zip;
//     }
//
//     set zip(value) {
//         this._zip = value;
//     }
//
//     get country() {
//         return this._country;
//     }
//
//     set country(value) {
//         this._country = country;
//     }
//
//
// }
//
// module.exports = User;
