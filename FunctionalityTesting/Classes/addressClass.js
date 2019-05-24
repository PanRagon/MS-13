//Nested function used to create ID in constructor
var countID = (function() {
   var id = 1;
   return function() { return id++; };
})();

var addresses = [];

function Address(street, postcode, city, state, country) {
	this.street = street;
	this.postcode = postcode;
	this.city = city;
	this.state = state;
	this.country = country;
	this.ID = countID();
}


var address1 = new Address("Kunnskapsveien 10", 2007, "Kjeller", "Akershus", "Norway");