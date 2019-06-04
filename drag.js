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
        DragDrop.card = this;
        this.className += " held";
        setTimeout(() => this.className="invisible", 1);
    }

    static dragend() {
        this.className = "projectViewTask";
    }

    static dragover(e) {
        e.preventDefault();
    }

    static dragenter(e) {
        e.preventDefault();
    }

    static drop() {
        this.append(DragDrop.card);
        
        Task.array.find(task => task.ID == DragDrop.card.getAttribute("taskid")).status = this.getAttribute("status");
        console.table(Task.array.find(task => task.ID == DragDrop.card.getAttribute("taskid")));



        //Task.array.find(task => task.ID === DragDrop.card.ID);
    }
}

document.addEventListener("DOMContentLoaded", DragDrop.init, console.log("done"));