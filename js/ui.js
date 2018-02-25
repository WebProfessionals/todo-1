"use strict";

/**
 * UI Controller,
 * Diese Methoden kennen nur die UI und das Model
 */


// task erzeugen und der Liste hinzufügen
let createTaskFromInput = function (inputEl) {
  let task = todoList.addTask(inputEl.value);
  addTaskToUI(task);
};


/**
 * fügt einen Task der Liste(DOM) hinzu
 * @param task
 */
let addTaskToUI = (task) => {
  let newDomItem = createDomItem(task);
  liste.appendChild(newDomItem);
};


/**
 * Baut die initiale Liste auf
 * @param taskListe
 */
let initListInUI = (taskListe) => {
  taskListe.forEach(task => {
    let i = createDomItem(task);
    liste.appendChild(i);
  })
};


let textAktualisierenWennNoetig = e =>{
  let task = e.detail.parentNode.task;
  let uiText = e.detail.innerHTML;
  if(task.text !==  uiText){
    task.text = uiText;
  }

};
/**
 * prüft ob ein Eintrag als erledigt markiert werden kann,
 * und macht es dann auch gleich
 * @param e
 */
let erledigenWennMoeglich = function (e) {
  if (e.target.classList.contains('check')) {
    e.target.parentNode.task.check();
    erledigtliste.appendChild(createDomItem(e.target.parentNode.task));
    e.target.parentNode.remove();
  }
};

/**
 * Prüft ob ein Eintrag gelöscht werden soll
 * und macht es dann auch gleich
 * @param e
 */
let loeschenWennMoeglich = function (e) {
  if (e.target.classList.contains('delete')) {
    todoList.removeTaskByID(e.target.parentNode.task.id);
    e.target.parentNode.remove();
  }
};

/**
 * prüft ob ein Eintrag als unerledigt markiert werden kann,
 * und macht es dann auch gleich
 * @param e
 */
let unerledigenWennMoeglich = function (e) {
  if (e.target.classList.contains('uncheck')) {
    e.target.parentNode.task.uncheck();
    liste.appendChild(createDomItem(e.target.parentNode.task));
    e.target.parentNode.remove();
  }
};


/**
 * Erstellt ein dom item für einen neuen task
 * @param task
 * @returns {HTMLLIElement}
 */
let createDomItem = (task) => {
  let item = document.createElement('li');
  let deleteButton = document.createElement('button');
  let erledigtButton = document.createElement('button');
  let text = document.createElement('text');

  item.task = task;
  /**
   * leider müssen wir wegen dem zu spezifischen CSS die Klasse dem li hinzufügen.
   * TODO: das CSS weniger spezifisch machen, damit wir dem li nicht noch extra eine Klasse zuweisen müssen.
   */
  item.classList.add('todo__item');


  /**
   * Erledigt Button kann check oder uncheck sein.
   */
  if (!task.erledigt) {
    erledigtButton.innerText = '[ ]';
    erledigtButton.classList.add('check');
    item.appendChild(erledigtButton);
  } else {
    erledigtButton.innerText = '[x]';
    erledigtButton.classList.add('uncheck');
    item.appendChild(erledigtButton);
  }


  /**
   * Wir machen den Text direkt editierbar und benachrichtigen bei blur
   * TODO: im CSS für den Text den outline auf none setzen.
   */
  text.innerHTML = task.text;
  text.setAttribute('contentEditable',true);
  text.addEventListener('blur', e => {
    let customEvent = new Event('text-blured', {bubbles: true});
    customEvent.detail = e.target;
    text.dispatchEvent(customEvent);
  });
  item.appendChild(text);


  /**
   * Delete Button bekommt die Klasse delete weil wir in loeschenWennMoeglich diesen abfragen
   */
  deleteButton.innerText = 'del';
  deleteButton.classList.add('delete');
  item.appendChild(deleteButton);

  return item;
};
