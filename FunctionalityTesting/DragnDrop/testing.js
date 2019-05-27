class App {

  static init() {

    App.taskCard = document.getElementsByClassName('taskCard')[0];
    App.todo = document.getElementById("todo");
    App.inProgress = document.getElementById("inProgress");
    App.finished = document.getElementById("finished");

    App.taskCard.addEventListener("dragstart", App.dragstart);
    App.taskCard.addEventListener("dragend", App.dragend);

    const containers = document.getElementsByClassName('status');

    for(const container of containers) {
      container.addEventListener("dragover", App.dragover);
      container.addEventListener("dragenter", App.dragenter);
      container.addEventListener("dragleave", App.dragleave);
      container.addEventListener("drop", App.drop);
    }
  }

  static todoHeight = 30;
  static inProgressHeight = 30;
  static finishedHeight = 30;

	static cardsInDiv(p) {
		return document.getElementById(p).getElementsByClassName("taskCard").length;
	}

	static calculateDivHeight() {
  		App.todoHeight = 30 + App.cardsInDiv("todo") * 100;
  		App.inProgressHeight = 30 + App.cardsInDiv("inProgress") * 100;
  		App.finishedHeight = 30 + App.cardsInDiv("finished") * 100;
  	}
  	static setDivHeight() {
  		App.calculateDivHeight();
  		App.todo.setAttribute("style", "height: " + App.todoHeight + "px;");
  		App.inProgress.setAttribute("style", "height: " + App.inProgressHeight + "px;");
  		App.finished.setAttribute("style", "height: " + App.finishedHeight + "px;");
  	}


  static dragstart() {
  	App.setDivHeight();
    this.className += " held";

  
    setTimeout(()=>this.className="invisible", 0);
  }

  static dragend() {
    this.className = "taskCard";
  }

  static dragover(e) {
    e.preventDefault();
  }

  static dragenter(e) {
    e.preventDefault();
   	if(this.id == "todo") {
   		App.todoHeight += 100;
   		this.setAttribute("style", "height: " + App.todoHeight + "px;");
   	}
   	if(this.id == "inProgress") {
   		App.inProgressHeight += 100;
   		this.setAttribute("style", "height: " + App.inProgressHeight + "px;");
   	}
   	if(this.id == "finished") {
   		App.finishedHeight += 100;
   		this.setAttribute("style", "height: " + App.finishedHeight + "px;");
   	}
  }

  static dragleave() {
  	/*if(this.id == "todo") {
   		App.todoHeight -= 100;
   		this.setAttribute("style", "height: " + App.todoHeight + "px;");
   	}
   	if(this.id == "inProgress") {
   		App.inProgressHeight -= 100;
   		this.setAttribute("style", "height: " + App.inProgressHeight + "px;");
   	}
   	if(this.id == "finished") {
   		App.finishedHeight -= 100;
   		this.setAttribute("style", "height: " + App.finishedHeight + "px;");

   	}*/
   	App.setDivHeight();
  }

  static drop() {;
    this.append(App.taskCard);
  }

}

document.addEventListener("DOMContentLoaded", App.init)