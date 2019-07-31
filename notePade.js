const notes_DOM = {
    clock: document.getElementById('clock'),
    nday: document.getElementById('day'),
    noteForm: document.getElementById('noteForm'),

    ShouldBeDone: document.getElementById('ShouldBeDone'),
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
    const { divForYellowNoteS } = notes_DOM;
    const memo_note = createNEWnote(note);
    if (!memo_note) return;
    divForYellowNoteS.append(memo_note);
}

function deleteNote (id){
    const index = findIndex(arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(index, 1);
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData);
    console.log(index)
}

function findIndex(data, thisNote) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].textarea === thisNote) {
            return i;
        }
    }
}

function createNEWnote(note) {
    const { textarea} = note;
    if (!textarea) return;

    const divForNote = document.createElement('div');
    divForNote.className = 'yellowNote col-lg-2 col-sm-6';
    divForNote.id = 'task#' + textarea;
    console.log(divForNote.id)

    const deleteButt = document.createElement('button');
    deleteButt.innerHTML = icons.deleteIcon;
    deleteButt.className = "btn btn-note";
    deleteButt.id = "bn";
    deleteButt.addEventListener("click",deleteNoteHandler)

    const checkButt = document.createElement('button');
    checkButt.innerHTML = icons.checkIcon;
    checkButt.className = "btn btn-note";
    checkButt.id = "bn";
    // checkButt.addEventListener("click",  )

    const divForButtons = document.createElement('div');
    divForButtons.className = 'divForButtons';

    const noteText = document.createElement('p');
    noteText.innerText = textarea;
    noteText.className = 'YellowNoteText';

    const newNoteTime = document.createElement('p');
    newNoteTime.id = "noteTime";
    newNoteTime.innerText = clockF();
    
    divForButtons.append(checkButt,deleteButt,newNoteTime)
    divForNote.append(divForButtons,noteText);

    return divForNote;
    
}

function deleteNoteHandler() {
    deleteNote(this.parentElement.parentElement.id)
    // console.log(this.parentElement.parentElement.id)
}

function validateNoteNum(textarea) {
    return findIndex(arrayOfData, textarea)
}

function saveNOTE(){
    const { textarea,divForYellowNoteS} = notes_DOM;
    
    const result = validateNoteNum(textarea.value);
    if (result !== undefined) {
        alert("Note already Exist!")
        return;
    }

    arrayOfData.push(new NOTE(textarea.value));
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData);
    divForYellowNoteS.reset();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function NOTE(_textarea){
    this.textarea = _textarea;
    // this.selected = false;
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("notesData")) || []
    draw(arrayOfData);
}

init();

function clockF() {

    var time = new Date();
    console.log(time);
    var endDate = new Date(2019, 07, 1, 0, 0, 0);
    console.log(endDate);

    var remTime = endDate.getTime() - time.getTime();

    var left_h = Math.floor(remTime/3600000);
    console.log(left_h)

    var left_m = Math.floor(remTime/60000) - (left_h*60);
    console.log(left_m)

    // var left_s = (remTime/1000/100) - Math.floor(remTime/1000/100);
    // console.log(left_s)
    // console.log(remTime);


    // if ( left_h.length < 2){
    //     left_h = '0'+ left_h;
    // }
    // if ( left_m.length < 2){
    //     left_m = '0'+ left_m;
    // }
    // if ( left_s.length < 2){
    //     left_s = '0'+ left_s;
    // }
    var remTimeSt ="Left : " + left_h + ' hours ' + left_m + ' minutes';
    // clock.textContent = remTimeSt;

    return remTimeSt;

}
clockF();
setInterval(clockF, 1000);