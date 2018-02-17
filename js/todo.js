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


  let addTaskToList = (task)=>{
    let newDomItem = createItemDom(task);
    liste.appendChild(newDomItem);
  };

  let initTaskList = (taskListe) => {
    console.log(taskListe)
    taskListe.forEach(task => {
      let i = createItemDom(task)
      liste.appendChild(i);
    })
  };


  let createItemDom = (task) => {
    let item = document.createElement('li');
    item.classList.add('todo__item');
    item.innerText = task.text;
    return item;
  };

  liste.innerHTML = '';
  initTaskList(todoList.tasks);

});
