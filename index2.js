(function () {


    // reset button

    var resetElement = document.getElementById('reset');
    resetElement.addEventListener('click', function () {
        document.getElementById("taskInfo").value = "";
        document.getElementById("dueDate").value = "";
        document.getElementById("dueTime").value = "";
    });

    // function to get localStorage -  if it fails return null

    window.getLocalStorage = function (key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        }
        catch (e) {
            return null;
        }
    }

    // function to set localStorage string key and stringified value of object

    window.setLocalStorage = function (key, obj) {
        localStorage.setItem(key, JSON.stringify(obj));
    }

    // set note function

    window.setNotesUi = function () {

        // get list and reset the innerHTML

        var toDoElement = document.getElementById('toDo');
        toDoElement.innerHTML = '';

        // map through notes and do the following actions for each function 

        window.notes.map(function (note, ind) {
            
            // filter input empty values from form in which case change span to give warning 

            if (note.taskInfo == "" || note.dueDate ==""){
                document.getElementById("span").innerHTML = "Please fill in task-info and date!"
            }  else  if (note.taskInfo != "" && note.dueDate !="") {
           
                // if not empty change ul html to create note + if note is of complete - toggle mystyle class (function following)
                // + prevent html inputs

                toDoElement.innerHTML += `<li class="` + (note.isComplete ? 'mystyle' : '') +`"> 
                <div class="buttons">
                    <button class="complete"><i class="fas fa-check"></i></button>
                    <button class="remove"><i class="far fa-trash-alt"></i></button>
                </div>
                <div class="content">
                `+ (note.taskInfo || '').replace(/</g, '&lt;').replace(/>/g, '&gt;') + `
            </div>
            <div class="date">` + note.dueDate + `</div>
            <div class="time">` + note.dueTime + `</div>               
            </li>`;

            // reset form inputs

            document.getElementById("span").innerHTML = "";
            document.getElementById("taskInfo").value = "";
            document.getElementById("dueDate").value = "";
            document.getElementById("dueTime").value = "";
        }});

        // jquery for each note add listener for remove & complete buttons

        toDoElement.childNodes.forEach(function (liElement, ind) {
            var removeElement = liElement.querySelector('.remove');
            var completeElement = liElement.querySelector('.complete');

            // splice the 1 Object of the indexed note, update notes & set in localStorage

            removeElement.addEventListener('click', function () {
                notes.splice(ind, 1);
                setNotesUi();
                setLocalStorage('notes', notes);
            });

            // listen to complete button of each note, if clicked toggle class, reset notes and re-store.   

            completeElement.addEventListener('click', function () {
                notes[ind].isComplete = !notes[ind].isComplete;
                setNotesUi();
                setLocalStorage('notes', notes);
            });
        })

        
    }

    // function to fetch notes in initial state - if empty make array

    function init() {
        
        window.notes = getLocalStorage('notes') || [];
        setNotesUi();

        // make note with form inputs by using button +reset notes+ set localStorage

        var submitElement = document.getElementById('submit');
        submitElement.addEventListener('click', function () {
            var taskInfoElement = document.getElementById('taskInfo');
            var dueDateElement = document.getElementById('dueDate');
            var dueTimeElement = document.getElementById('dueTime');
            
            var note = {
                taskInfo: taskInfoElement.value,
                dueDate: dueDateElement.value,
                dueTime: dueTimeElement.value
            };

            notes.push(note);
            setNotesUi();
            setLocalStorage('notes', notes);
        });
    }

    init();

})();