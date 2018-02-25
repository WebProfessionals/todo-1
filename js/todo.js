"use strict";

let todoList = new TodoList();
let taskInputFields;
let liste;
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
  erledigtliste = document.getElementById('erledigtliste');


  /**
   * UI Listener
   */

  liste.addEventListener('text-blured',e=>{
    textAktualisierenWennNoetig(e);
  });

  // listener für Task Aktionen
  liste.addEventListener('click', e => {
    loeschenWennMoeglich(e);
    erledigenWennMoeglich(e);
  });

  // listener für Task Aktionen in erledigt Liste
  erledigtliste.addEventListener('click', e => {
    loeschenWennMoeglich(e);
    unerledigenWennMoeglich(e);
  });

  // Listener für die Eingabe
  taskInputFields.forEach((inputEl) => {
    // Auf Enter Taste hören
    inputEl.addEventListener('keypress', e => {
      if (e.keyCode === 13 && inputEl.value !== '') {
        createTaskFromInput(inputEl);
        // input wieder leeren
        inputEl.value = '';
      }
    });
  });
});
