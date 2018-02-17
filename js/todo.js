"use strict";

let todoList = new TodoList();

ready(() => {

  let taskInputFields = document.querySelectorAll('.todo__inputfield');
  let liste = document.getElementById('liste');

  taskInputFields.forEach((inputEl) => {
    // Auf Enter Taste hören
    inputEl.addEventListener('keypress', e => {
      if (e.keyCode === 13 && inputEl.value !== '') {
        // task der Liste hinzufügen
        todoList.addTask(inputEl.value);
        // input wieder leeren
        inputEl.value = '';
      }
    });
  });
});