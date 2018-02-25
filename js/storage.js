"use strict";
ready(() => {

  // Callback wenn ein neuer Task erstellt wurde
  todoList.onNewTask = (task) => {
    let speicherName = 'task' + task.id;
    localStorage.setItem(speicherName, JSON.stringify(task));
    return task;
  };

  // Callback wenn die Liste initialisiert wurde
  let maxID = 1;
  todoList.onInit = (liste) => {
    for(let task in localStorage){
      if(localStorage.hasOwnProperty(task)){
        let vorlage = JSON.parse(localStorage.getItem(task));
        let t = new Task(vorlage._text);
        t.id = vorlage.id;
        t._position = vorlage._position;
        t.erledigt = vorlage.erledigt;
        todoList.tasks.push(t);
        maxID = t.id + 2;
      }
    }

    todoList._maxID = maxID;
    todoList.onInitComplete();
  };
  todoList.onInit(todoList);


  // Todo: Callback wenn ein neuer Task gelöscht wurde


  // Todo: Callback wenn ein neuer Task aktualisiert wurde


});