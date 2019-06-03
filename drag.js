class DragDrop {
    static init() {

        DragDrop.taskCards = document.getElementsByClassName("projectViewTask");

        for(const taskCard of DragDrop.taskCards) {
            taskCard.addEventListener("dragstart", DragDrop.dragstart);
            taskCard.addEventListener("dragend", DragDrop.dragend);
        }
        const containers = document.getElementsByClassName("projectViewStatusWrap");

        for(const container of containers) {
            container.addEventListener("dragover", DragDrop.dragover);
            container.addEventListener("dragenter", DragDrop.dragenter);
            container.addEventListener("dragleave", DragDrop.dragleave);
            container.addEventListener("drop", DragDrop.drop);
        }
    }

    static card = "";

    static dragstart() {
        console.log(this.parentElement);
        DragDrop.card = this;
        this.className += " held";


        setTimeout(()=>this.className="invisible", 0);
    }

    static dragend() {
        console.log("end");
        this.className = "projectViewTask";
    }

    static dragover(e) {
        e.preventDefault();
    }

    static dragenter(e) {
        console.log("enter");
        e.preventDefault();
    }

    static drop() {
        console.log("drop");
        this.append(DragDrop.card);
        
    }


}

document.addEventListener("DOMContentLoaded", DragDrop.init, console.log("done"));