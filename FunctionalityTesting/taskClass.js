
var countID = (function() {
   var id = 1;
   return function() { return id++; };
})();


function Oppgave(title, description, owners, workers, location, ID) {
  this.title = title;
  this.description = description;
  this.owners = owners;
  this.workers = workers;
  this.location = location;
  this.ID = countID();
}

var arrayOwners1 = ["John", "Michael"];

var arrayWorkers1 = ["Grete", "Stefan", "Louise"];

var oppgave1 = new Oppgave("Fortnite", "med gutta", arrayOwners1, arrayWorkers1, "Oslo");

console.log(oppgave1);

var oppgave2 = new Oppgave("Tørke støv", "Kjedelig, men viktig");

console.log(oppgave2);

var oppgave3 = new Oppgave("meh", "meh");

console.log(oppgave3);