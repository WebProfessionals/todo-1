"use strict";
ready(() => {

  todoList.onNewTask = (task) => {
    let speicherName = 'task' + task.id;
    localStorage.setItem(speicherName, JSON.stringify(task));
    return task;
  };

  todoList.onInit = (liste) => {
    for(let task in localStorage){
      if(localStorage.hasOwnProperty(task)){
        let vorlage = JSON.parse(localStorage.getItem(task));
        let t = new Task(vorlage._text);
        t.id = vorlage.id;
        t._position = vorlage._position;
        t.erledigt = vorlage.erledigt;

        todoList.tasks.push(t);
      }
    }
  };
  todoList.onInit(todoList);

});