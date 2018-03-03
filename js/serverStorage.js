"use strict";
ready(() => {

  // Callback wenn ein neuer Task erstellt wurde
  todoList.onNewTask = (task) => {
    let speicherName = 'task' + task.id;
    localStorage.setItem(speicherName, JSON.stringify(task));
    return task;
  };

  // Callback wenn die Liste initialisiert wurde
  todoList.onInit = (liste) => {

    let request = new XMLHttpRequest();
    request.open('GET', './api/alltasks.json');

    request.onload = (e) => {
      if(request.status >= 400){
        console.warn('Keine Verbindung zum Server möglich')
        todoList._maxID = 1;
      }else{
        todoList._maxID = _taskObjErzeugenUndAnTodolistAnhaengen(JSON.parse(request.responseText));
      }


      todoList.onInitComplete();

    };



    request.send();

  };

  todoList.onInit(todoList);


  // Todo: Callback wenn ein neuer Task gelöscht wurde
  todoList.onDeleteTask = (taskToDelete) => {
    for (let task in localStorage) {
      let taskFromStorage = JSON.parse(localStorage.getItem(task));
      if (taskFromStorage.id === taskToDelete.id) {
        localStorage.removeItem('task' + taskFromStorage.id);
        break;
      }
    }
  };


  // Todo: Callback wenn ein neuer Task aktualisiert wurde
  TodoList.onUpdateTask = (taskToUpdate) => {
    for (let task in localStorage) {
      let taskFromStorage = JSON.parse(localStorage.getItem(task));
      if (taskFromStorage.id === taskToUpdate.id) {
        let template = '{"id":' + taskToUpdate.id +
            ',"_text":"' + taskToUpdate._text + '"' +
            ',"erledigt":' + taskToUpdate.erledigt +
            ',"_position":' + taskToUpdate._position + '}';
        localStorage.setItem(task, template);
        break;
      }
    }
  };

  /**
   * Erzeugt ein Task Object und pusht dieses dann an todoList.tasks
   *
   * @param list
   * @returns {Number} Höchste ID+2
   * @private
   */
  let _taskObjErzeugenUndAnTodolistAnhaengen = function (list) {
    let maxID = 1;
    list.forEach(vorlage => {
      let t = new Task(vorlage._text);
      t.id = vorlage.id;
      t._position = vorlage._position;
      t.erledigt = vorlage.erledigt;
      todoList.tasks.push(t);
      maxID = t.id + 2;
    });
    return maxID;
  };

});