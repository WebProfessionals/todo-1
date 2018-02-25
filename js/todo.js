"use strict";

let todoList = new TodoList();
let taskInputFields;
let liste;
let todos;
let erledigtliste;

todoList.onInitComplete = ()=>{
  // Baue die Liste in der UI auf sobald das model bereit ist
  liste.innerHTML = '';
  initListInUI(todoList.tasks);
};

ready(() => {

  /**
   * UI Elemente
   */
  taskInputFields = document.querySelectorAll('.todo__inputfield');
  liste = document.getElementById('liste');
  todos = document.getElementById('todos');
  erledigtliste = document.getElementById('erledigtliste');


  /**
   * UI Listener
   */

  todos.addEventListener('text-blured',e=>{
    textAktualisierenWennNoetig(e);
  });

  // listener für Task Aktionen
  todos.addEventListener('click', e => {
    loeschenWennMoeglich(e);
    erledigenWennMoeglich(e);
    unerledigenWennMoeglich(e);
  });

  // Listener für die Eingabe
  taskInputFields.forEach((inputEl) => {
    inputEl.addEventListener('keypress', e => {
      // Auf Enter Taste hören
      if (e.keyCode === 13 && inputEl.value !== '') {
        createTaskFromInput(inputEl);
        // input wieder leeren
        inputEl.value = '';
      }
    });
  });
});
