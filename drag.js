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

        // Add padding for easier drop
        let statusWraps = document.getElementsByClassName("projectViewStatusWrap");
        for (let i = 0; i < statusWraps.length; i++) {
            statusWraps[i].setAttribute("style", "padding-bottom: 113px");
        }

        this.classList.add("held");
        setTimeout(() => this.classList.add("invisible"), 1);
    }


    static dragend() {
        this.classList.remove("held", "invisible");

        // Remove padding on dragend
        let statusWraps = document.getElementsByClassName("projectViewStatusWrap");
        for (let i = 0; i < statusWraps.length; i++) {
            statusWraps[i].removeAttribute("style");
        }

        updateProjectViewCounters();
    }

    static dragover(e) {
        e.preventDefault();
    }

    static dragenter(e) {
        e.preventDefault();
    }

    static drop() {
        this.append(DragDrop.card);
        DragDrop.card.classList.remove("projectViewTaskToDo", "projectViewTaskInProgress", "projectViewTaskDone");
        DragDrop.card.classList.add("projectViewTask" + this.getAttribute("status"));
        Task.array.find(task => task.ID == DragDrop.card.getAttribute("taskid")).status = this.getAttribute("status");
    }
}

document.addEventListener("DOMContentLoaded", DragDrop.init, console.log("done"));