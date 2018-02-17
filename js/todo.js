"use strict";

let todoList = new TodoList();
todoList.addTask('hahah');
todoList.addTask('hahah');
todoList.addTask('hahah');

ready(() => {

  let taskInputFields = document.querySelectorAll('.todo__inputfield');
  let liste = document.getElementById('liste');

  taskInputFields.forEach((inputEl) => {
    // Auf Enter Taste hören
    inputEl.addEventListener('keypress', e => {
      if (e.keyCode === 13 && inputEl.value !== '') {
        // task der Liste hinzufügen
        let task = todoList.addTask(inputEl.value);
        addTaskToList(task);
        // input wieder leeren
        inputEl.value = '';

      }
    });
  });


  /**
   * fügt einen Task der Liste(DOM) hinzu
   * @param task
   */
  let addTaskToList = (task)=>{
    let newDomItem = createItemDom(task);
    liste.appendChild(newDomItem);
  };


  /**
   * Baut die initiale Liste auf
   * @param taskListe
   */
  let initTaskList = (taskListe) => {
    taskListe.forEach(task => {
      let i = createItemDom(task)
      liste.appendChild(i);
    })
  };

  /**
   * Erstellt ein dom item für einen neuen task
   * todo: muss noch vervollständigt werden
   * @param task
   * @returns {HTMLLIElement}
   */
  let createItemDom = (task) => {
    let item = document.createElement('li');
    item.classList.add('todo__item');
    item.innerText = task.text;
    return item;
  };


  // Initialisiert die Liste
  liste.innerHTML = '';
  initTaskList(todoList.tasks);

});
