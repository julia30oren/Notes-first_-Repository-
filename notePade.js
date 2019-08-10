const notes_DOM = {
    deadLineYear: document.getElementById('year'),
    deadLineMonth: document.getElementById('month'),
    deadLineDay: document.getElementById('day'),

    noteForm: document.getElementById('noteForm'),
    textarea: document.getElementById('exampleFormControlTextarea1'),
    divForYellowNoteS: document.getElementById('divForYellowNoteS'),
}

let arrayOfData = [];

function draw(array){
    clearAll();

    for (i=0; i<array.length; i++) {
        drawNote(array[i])
    }
}

function clearAll() {
    notes_DOM.divForYellowNoteS.innerHTML = '';
}

function drawNote(note) {
    // console.log('NOTES ID ' + note.id)
    const { divForYellowNoteS } = notes_DOM;
    const memo_note = createNEWnote(note);
   
    if (!memo_note) return;
    divForYellowNoteS.append(memo_note);
}

function deleteNote (id){
    const ind = findIndex (arrayOfData, id);
    if (ind === undefined) return;
    arrayOfData.splice(ind, 1)
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData);
}

function findIndex(data, _id) {
 
    // console.log('Id is ' + _id);
    for (let index = 0; index < data.length; index++) {
        // console.log(data[index].id);
                if (data[index].id === _id) {
                    // console.log(data[index].id + ' WWWWW ' + _id)
                    return index
                }
            }
}

function createNEWnote(note) {
    const { name, textarea, id, deadLineYear, deadLineMonth, deadLineDay ,timer } = note;
    if (!textarea) return;

    const divForNote = document.createElement('div');
    divForNote.className = 'yellowNote col-lg-2 col-sm-4';
    // console.log('DIVFORNOTE ID ' + id)
    divForNote.id = id

    const deleteButt = document.createElement('button');
    deleteButt.innerHTML = icons.deleteIcon;
    deleteButt.className = "btn btn-danger";
    deleteButt.id = "dltBtn";
    deleteButt.addEventListener("click",deleteNoteHandler)

    const checkButt = document.createElement('button');
    checkButt.innerHTML = icons.checkIcon;
    checkButt.className = "btn btn-success";
    checkButt.id = "checkBtn";
    checkButt.addEventListener("click", addNewName )

    const divForButtons = document.createElement('div');
    divForButtons.className = 'divForButtons';

    const noteT = document.createElement('p');
    noteT.innerText = textarea;

    const noteText = document.createElement('p');
    noteText.innerText = name;
    noteText.className = 'YellowNoteText';
    noteText.append(noteT);

    const newNoteTime = document.createElement('p');
    newNoteTime.id = "noteTime";
    newNoteTime.innerText = "Left Time : " + new Date(deadLineYear, deadLineMonth, deadLineDay);
    // newNoteTime = function(){
    //     console.log(deadLineYear, deadLineMonth, deadLineDay)
    // }
    // newNoteTime.innerHTML = "Left Time : " + timer; 

    // newNoteTime.innerHTML = deadLineYear + "year" 
    //    + deadLineMonth + "month" + deadLineDay + "day";

    
    divForButtons.append(checkButt,deleteButt)
    divForNote.append(divForButtons,noteText,newNoteTime);

    return divForNote;
}

function deleteNoteHandler() {
    // console.log('Parent elemtn id ' + this.parentElement.id);
    deleteNote(this.parentElement.parentElement.id)
}

function addNewName(){
    const noteIndex = findIndex(arrayOfData, this.parentElement.parentElement.id);
    const currentNote = arrayOfData[noteIndex];
    const { textarea } = currentNote;
    notes_DOM.textarea.value = textarea;
    // console.log(noteIndex);
    currentNote.name = "Already Done : ";
    // console.log(currentNote);
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData);
}

function validateNoteNum(textarea) {
    return findIndex(arrayOfData, textarea)
}

function saveNOTE(){
    const { textarea ,deadLineYear, deadLineMonth, deadLineDay, timer} = notes_DOM;
    id = 'task#' + Math.round(Math.random()*99);
    // console.log('THIs is ' + textarea + ' and ' + id)

    const result = validateNoteNum(textarea.value, id);
    if (result !== undefined) {
        alert("Note already Exist!")
        return;
    }
    arrayOfData.push(new NOTE(name, textarea.value, id, deadLineYear.value, 
        deadLineMonth.value, deadLineDay.value, timer ));
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData)
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function NOTE(_name, _textarea, _id, _deadLineYear, _deadLineMonth, _deadLineDay , _timer){
    this.name = "New Note : ";
    this.textarea = _textarea;
    this.id = _id;
    this.deadLineYear = _deadLineYear;
    this.deadLineMonth = _deadLineMonth;
    this.deadLineDay = _deadLineDay;
    this.timer = " ";
    this.selected = false;
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("notesData")) || []
    draw(arrayOfData);
}
init();


console.log(arrayOfData);