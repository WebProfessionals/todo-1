let assert = require('chai').assert;
let expect = require('chai').expect;

let Task = require('./todo.js').Task;
let TodoList = require('./todo.js').TodoList;

describe('Todo', function () {

    it('wir sollten ein Task Objekt erzeugen können', function () {
        let t = new Task;
        assert.instanceOf(t, Task);
    });

    it('wir sollten eine Todoliste erzeugen können', function () {
        let t = new TodoList;
        assert.instanceOf(t, TodoList);
    });

    describe('Task', function () {
        it('Wir sollten eine ID, einen Text, eine Position und erledigt setzen können', function () {
            let task = new Task;
            expect(task).to.have.property('_text');
            expect(task).to.have.property('id');
            expect(task).to.have.property('erledigt');
            expect(task).to.have.property('_position');
        });

        it('Text sollte ein String sein', function () {
            let task = new Task;
            task.text = 'Beispieltext';
            expect(task.text).to.be.a('string');
            console.log(task.text + '--> typeof:' + typeof task.text);

            task.text = 33;
            expect(task.text).to.be.a('string');
            console.log(task.text + '--> typeof:' + typeof task.text);

        });

        it('Position sollte eine Nummer sein ', function () {
            let task = new Task;
            task.position = 2;
            expect(task.position).to.be.a('number');
            console.log(task.position + '--> typeof:' + typeof task.position);

            task.position = 'Beispieltext';
            expect(task.position).to.be.a('number');
            console.log(task.position + '--> typeof:' + typeof task.position);
        });

        it('ein Task sollte auf erledigt gesetzt werden können', function () {
            let task = new Task;
            task.checkTask();
            task.uncheckTask();
            task.checkTask();
            expect(task.erledigt).to.equal(true);


        });
        it('ein Task sollte auf NICHT erledigt gesetzt werden können', function () {
            let task = new Task;
            task.uncheckTask();
            task.checkTask();
            task.uncheckTask();
            expect(task.erledigt).to.equal(false);
        });

    });

    describe('TodoList', function () {
        it('es sollten tasks enthalten können', function () {
            let liste = new TodoList;
            expect(liste.tasks).to.be.an('array');
        });

        it('Wir sollten einen neuen Task hinzufügen können', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            expect(liste.tasks.length).to.equal(1);
            liste.addTask('neue Aufgabe 2');
            expect(liste.tasks.length).to.equal(2);

            expect(liste.tasks[0].text).to.equal('neue Aufgabe 1');
            expect(liste.tasks[1].text).to.equal('neue Aufgabe 2');
        });

        it('ein neuer Task sollte auf die letzte Position gesetzt werden', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            expect(liste.tasks[0].position).to.equal(1);

            liste.addTask('neue Aufgabe 2');
            expect(liste.tasks[1].position).to.equal(2);

            liste.addTask('neue Aufgabe 3');
            liste.tasks[2].position =202;
            expect(liste.tasks[2].position).to.equal(202);

            liste.addTask('neue Aufgabe 4');
            expect(liste.tasks[3].position).to.equal(203);
        });

        it('ein Task in der Liste sollte auf "erledigt", "NICHT erledigt" gesetzt werden können', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            liste.addTask('neue Aufgabe 2');
            liste.addTask('neue Aufgabe 3');
            liste.addTask('neue Aufgabe 4');
            liste.addTask('neue Aufgabe 5');
            liste.addTask('neue Aufgabe 6');

            liste.solveTask(5);
            expect(liste.tasks[5].erledigt).to.equal(true);

            liste.unsolveTask(5);
            expect(liste.tasks[5].erledigt).to.equal(false);
        });

        it('Wir sollten einen Task löschen können', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            liste.addTask('neue Aufgabe 2');
            liste.addTask('neue Aufgabe 3');
            liste.addTask('neue Aufgabe 4');
            liste.addTask('neue Aufgabe 5');
            liste.addTask('neue Aufgabe 6');

            liste.removeTask(4);
            expect(liste.tasks.length).to.equal(5);
            expect(liste.tasks[4].text).to.equal('neue Aufgabe 6');
        });

        it('wir sollten einen Task ändern können', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            liste.addTask('neue Aufgabe 2');
            liste.addTask('neue Aufgabe 3');
            liste.addTask('neue Aufgabe 4');
            liste.addTask('neue Aufgabe 5');
            liste.addTask('neue Aufgabe 6');

            liste.updateTask(4,'neuer Text');
            expect(liste.tasks[4].text).to.equal('neuer Text');
        });

        it('Wir sollten einen Task nach vorne vor einen anderen schieben können', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            liste.addTask('neue Aufgabe 2');
            liste.addTask('neue Aufgabe 3');
            liste.addTask('neue Aufgabe 4');
            liste.addTask('neue Aufgabe 5');
            liste.addTask('neue Aufgabe 6');

            liste.moveBefore(3,2);
            expect(liste.tasks[1].text).to.equal('neue Aufgabe 4');
            console.log(liste.tasks);
        });

        it('Wir sollten einen Task nach hinten vor einen anderen schieben können', function () {
            let liste = new TodoList;
            liste.addTask('neue Aufgabe 1');
            liste.addTask('neue Aufgabe 2');
            liste.addTask('neue Aufgabe 3');
            liste.addTask('neue Aufgabe 4');
            liste.addTask('neue Aufgabe 5');
            liste.addTask('neue Aufgabe 6');

            liste.moveBefore(1,5);
            console.log(liste.tasks);
            expect(liste.tasks[5].text).to.equal('neue Aufgabe 1');

        });

    });
});

