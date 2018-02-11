"use strict";

class Task {
    constructor(text) {
        this.id = 1;
        this._text = text || '';
        this.erledigt = false;
        this._position = 1;
    }

    /**
     *
     * @returns {*}
     */
    get text() {
        return this._text;
    }

    /**
     * Ueberschreibt/setzt den Text von Task
     * @param v : Text der gesetzt werden sollte
     */
    set text(v) {
        if (typeof v === 'string' || typeof v === 'number') {
            this._text = v.toString();
        }
        else {
            console.log('sorry das ist kein gültiger Text');
        }
    }


    /**
     * Setzt die Positionsnummer neu
     * @param v : Nummer die, die Positionsnummer überschreibt
     */
    set position(v) {
        if (typeof v === 'number') {
            this._position = v;
        }
    }

    /**
     *
     * @returns {number|*}
     */
    get position() {
        return this._position;
    }

    /**
     * setzt den Task auf erledigt
     */
    checkTask() {
        this.erledigt = true;
    }

    /**
     * Setzt den Task auf NICHT erledigt
     */
    uncheckTask() {
        this.erledigt = false;
    }


}

class TodoList {
    constructor() {
        this.tasks = [];
    }

    /**
     * Füge einen Task hinzu
     * @param text
     * @returns {Task}
     */
    addTask(text) {
        let newTask = new Task(text);
        if (this.tasks.length > 0) {
            let letztePosition = this.tasks[this.tasks.length - 1].position;
            newTask.position = letztePosition + 1;
        }
        this.tasks.push(newTask);
        return newTask;
    }

    /**
     * Task auf erledigt setzen
     * @param index
     */
    solveTask(index) {
        this.tasks[index].erledigt = true;
    }

    /**
     * Task auf NICHT erledigt setzen
     * @param index
     */
    unsolveTask(index) {
        this.tasks[index].erledigt = false;
    }

    /**
     * Task entfernen/löschen
     * @param index : Index des zu löschenden Tasks
     */
    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    /**
     * Text eines Tasks ändern
     * @param index
     * @param text
     */
    updateTask(index, text) {
        this.tasks[index].text = text;
    }

    moveBefore(source, target) {
        let afterTask = 0;
        if (target > 0) {
            let afterTask = this.tasks[target - 1].position;
        }
        let beforeTask = this.tasks[target].position;

        this.tasks[source].position = (afterTask + beforeTask) / 2;

        this.tasks.sort(function vergeiche(a, b) {
            return a.position - b.position;
        });

    }


}


// Machen wir nur für die Tests
if (typeof module !== 'undefined' && module) {
    module.exports.Task = Task;
    module.exports.TodoList = TodoList;
}