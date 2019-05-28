class DragDrop {
    static init() {
        DragDrop.taskCard = document.getElementsByClassName("taskCard")[0];

        DragDrop.taskCard.addEventListener("dragstart", DragDrop.dragstart);
        DragDrop.taskCard.addEventListener("dragend", DragDrop.dragend);

        DragDrop.todo = document.getElementById("todo");
        DragDrop.inProgress = document.getElementById("inProgress");
        DragDrop.finished = document.getElementById("finished");

        DragDrop.todoContainer = document.getElementById("todoContainer");
        DragDrop.inProgressContainer = document.getElementById("inProgressContainer");
        DragDrop.finishedContainer = document.getElementById("finishedContainer");

        const containers = document.getElementsByClassName("statusContainer");

        for(const container of containers) {
            container.addEventListener("dragover", DragDrop.dragover);
            container.addEventListener("dragenter", DragDrop.dragenter);
            container.addEventListener("dragleave", DragDrop.dragleave);
            container.addEventListener("drop", DragDrop.drop);
        }
    }

    static todoHeight = 30;
    static inProgressHeight = 30;
    static finishedHeight = 30;

    static cardsInDiv(p) {
        return document.getElementById(p).getElementsByClassName("taskCard").length;
    }

    static calculateDivHeight() {
        DragDrop.todoHeight = 30 + DragDrop.cardsInDiv("todoContainer") * 100;
        DragDrop.inProgressHeight = 30 + DragDrop.cardsInDiv("inProgressContainer") * 100;
        DragDrop.finishedHeight = 30 + DragDrop.cardsInDiv("finishedContainer") * 100;
    }

    static setDivHeight() {
        DragDrop.calculateDivHeight();
        DragDrop.todo.setAttribute("style", "height: " + DragDrop.todoHeight + "px;");
        DragDrop.inProgress.setAttribute("style", "height: " + DragDrop.inProgressHeight + "px;");
        DragDrop.finished.setAttribute("style", "height: " + DragDrop.finishedHeight + "px;");
    }

    static addHeight(d) {
        if(d == "todo") {
            DragDrop.todoHeight += 100;
            DragDrop.todo.setAttribute("style", "height: " + DragDrop.todoHeight + "px;");
        }else if(d == "inProgress") {
            DragDrop.inProgressHeight += 100;
            DragDrop.inProgress.setAttribute("style", "height: " + DragDrop.inProgressHeight + "px;");
        }else if(d == "finished") {
            DragDrop.finishedHeight += 100;
            DragDrop.finished.setAttribute("style", "height: " + DragDrop.finishedHeight + "px;");
        }
    }

    static removeHeight(d) {
        if(d == "todo") {
            DragDrop.todoHeight -= 100;
            DragDrop.todo.setAttribute("style", "height: " + DragDrop.todoHeight + "px;");
        }else if(d == "inProgress") {
            DragDrop.inProgressHeight -= 100;
            DragDrop.inProgress.setAttribute("style", "height: " + DragDrop.inProgressHeight + "px;");
        }else if(d == "finished") {
            DragDrop.finishedHeight -= 100;
            DragDrop.finished.setAttribute("style", "height: " + DragDrop.finishedHeight + "px;");
        }
    }

    static dragstart() {
        console.log(this.parentElement);
        this.className += " held";
        DragDrop.removeHeight(this.parentElement.id);


        setTimeout(()=>this.className="invisible", 0);
    }

    static dragend() {
        console.log("end");
        this.className = "taskCard";
        DragDrop.setDivHeight();
    }

    static dragover(e) {
        e.preventDefault();
    }

    static dragenter(e) {
        console.log("enter");
        e.preventDefault();
        if(this.id == "todoContainer") {
            DragDrop.addHeight("todo");
        } else if(this.id == "inProgressContainer") {
            DragDrop.addHeight("inProgress");
        } else if(this.id == "finishedContainer") {
            DragDrop.addHeight("finished");
        }
    }

    static dragleave() {
        console.log("leave");
        if (this.id == "todoContainer") {
            DragDrop.removeHeight("todo");
        }
        if(this.id == "inProgressContainer") {
            DragDrop.removeHeight("inProgress");
        }
        if(this.id == "finishedContainer") {
            DragDrop.removeHeight("finished");

        }
    }

    static drop() {
        console.log("drop");
        if(this.id == "todoContainer") {
            DragDrop.todo.append(DragDrop.taskCard);
            //DragDrop.setDivHeight();
            //DragDrop.todoHeight += 100;
            //DragDrop.todo.setAttribute("style", "height: " + DragDrop.todoHeight + "px;");
        } else if(this.id == "inProgressContainer") {
            DragDrop.inProgress.append(DragDrop.taskCard);
            //DragDrop.setDivHeight();
            //DragDrop.inProgressHeight += 100 
            //DragDrop.inProgress.setAttribute("style", "height: " + DragDrop.inProgressHeight + "px;");
        } else if(this.id == "finishedContainer") {
            DragDrop.finished.append(DragDrop.taskCard);
            //DragDrop.finishedHeight += 100;
            //DragDrop.finished.setAttribute("style", "height: " + DragDrop.finishedHeight + "px;");
        }
        
    }


}

document.addEventListener("DOMContentLoaded", DragDrop.init)