"use strict";

let todoList = new TodoList();

ready(() => {

  let taskInputFields = document.querySelectorAll('.todo__inputfield');
  let liste = document.getElementById('liste');
  let erledigtliste = document.getElementById('erledigtliste');


  liste.addEventListener('text-blured',e=>{
    textAktualisierenWennNoetig(e);
  });
  // listener für Task Aktionen
  liste.addEventListener('click', e => {
    loeschenWennMoeglich(e);
    erledigenWennMoeglich(e);
  });

  erledigtliste.addEventListener('click', e => {
    loeschenWennMoeglich(e);
    unerledigenWennMoeglich(e);
  });


  taskInputFields.forEach((inputEl) => {
    // Auf Enter Taste hören
    inputEl.addEventListener('keypress', e => {
      if (e.keyCode === 13 && inputEl.value !== '') {
        // task der Liste hinzufügen
        // ?? direkte Manipulation des Models aus UI Code?
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
  let addTaskToList = (task) => {
    let newDomItem = createItemDom(task);
    liste.appendChild(newDomItem);
  };


  /**
   * Baut die initiale Liste auf
   * @param taskListe
   */
  let initTaskList = (taskListe) => {
    taskListe.forEach(task => {
      let i = createItemDom(task);
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
    item.task = task;

    let del = document.createElement('button');
    del.innerText = 'del';
    del.classList.add('delete');
    item.appendChild(del);

    let erledigt = document.createElement('button');
    if (!task.erledigt) {
      erledigt.innerText = '[ ]';
      erledigt.classList.add('check');
      item.appendChild(erledigt);
    } else {
      erledigt.innerText = '[x]';
      erledigt.classList.add('uncheck');
      item.appendChild(erledigt);
    }

    item.classList.add('todo__item');
    let text = document.createElement('text');
    text.innerHTML = task.text;
    text.setAttribute('contentEditable',true);

    text.addEventListener('blur', e => {

      let customEvent = new Event('text-blured', {bubbles: true});
      customEvent.detail = e.target;
      text.dispatchEvent(customEvent);
    });

    item.appendChild(text);
    return item;
  };


  // Initialisiert die Liste
  liste.innerHTML = '';
  initTaskList(todoList.tasks);


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
      erledigtliste.appendChild(createItemDom(e.target.parentNode.task));
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
      liste.appendChild(createItemDom(e.target.parentNode.task));
      e.target.parentNode.remove();
    }
  };
});
