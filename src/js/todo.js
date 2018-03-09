"use strict";

let todoList = new TodoList(); // Unser TodoListen Modell
let taskInputFields; // Alle Eingabefelder der UI
let liste; // Die Liste der unerledigten Tasks
let erledigtliste; // Die Liste der erledigten Tasks
let todos; // Hülle um beide Listen

const ENTERTASTE = 13;
const ECAPETASTE = 27;

todoList.onInitComplete = () => {
  // Baue die Liste in der UI auf sobald das model bereit ist
  //Todo: Inhalt vom LI im Html entfernen, damit wir auf das leeren des li's verzichten können
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

  todos.addEventListener('text-blured', e => {
    textAktualisierenWennNoetig(e);
  });

  todos.addEventListener('click', e => {
    loeschenWennMoeglich(e);
    erledigenWennMoeglich(e);
    unerledigenWennMoeglich(e);
  });

  // Auf den Keyup event hören, weil die ESC Taste keinen Keypress auslösen tut
  todos.addEventListener('keyup', e => {

    if (e.keyCode === ECAPETASTE) {
      taskInputFields[0].focus();
    }
    /**
     * control + enter zum speichern. Eigentlich verlassen wir das Feld nur, denn beim verlassen wird gespeichert.
     * TODO: Eventuell das Nächste Item anspringen und nicht wieder auf die Eingabe
     */
    if (e.keyCode === ENTERTASTE && e.ctrlKey === true) {
      taskInputFields[0].focus();
    }

  });

  taskInputFields.forEach((inputEl) => {
    inputEl.addEventListener('keypress', e => {
      // Auf Enter Taste hören
      if (e.keyCode === ENTERTASTE && inputEl.value !== '') {
        createTaskFromInput(inputEl);
        // input wieder leeren
        inputEl.value = '';
      }
    });
  });
});
