//Nested function used to define unique ID in Role constructor
var countIDRole = (function() {
	var id = 1;
	return function() { 
   		return id++; 
	};
})();

var roles = [];

function Role(name, level, type) {
	this.ID = countIDRole();
	this.name = name;
	this.level = level;
	this.type = type;

		if(level < 0) {
			console.log("The access level is too low, use a value between 0 and 10");
			delete this;
		} else if(level > 10) {
			console.log("The access level is too high, use a value between 0 and 10");
			delete this;
		}

	roles.push(this);
}

new Role("Project admin", 10, "Administrator");

new Role("Head of Design", 8, "Designer");

new Role("Code Monkey", 2, "Developer");

new Role("Pixel Pusher", 2, "Designer");

console.log(roles);