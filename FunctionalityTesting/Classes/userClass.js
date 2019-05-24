//Nested function used to define unique ID in constructor
var countID = (function() {
   var id = 1;
   return function() { return id++; };
})();

//Array of users
var users = [];

//Constructor for User class
function User(firstName, middleName, lastName, email) {
	this.firstName = firstName;
	this.middleName = middleName;
		//Remove middle name if user has none
		if(this.middleName === undefined || this.middleName === null || this.middleName === "") {
			delete this.middleName;
		}
	this.lastName = lastName;
	this.email = email;
	this.ID = countID();

	//Push this user into array
	users.push(this);
}

//Creation of users
var user1 = new User("Christian", null, "Iversen", "haha@gmail.com");
var user2 = new User("Lukas", "Henrik", "Jensen", "lol@gmail.com");

Object.defineProperty(user1, "location", {
	value : "Oslo"
});

console.log(users);


console.log(addresses);