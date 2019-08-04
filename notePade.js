const notes_DOM = {
    clock: document.getElementById('clock'),
    nday: document.getElementById('day'),
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
    console.log('NOTES ID ' + note.id)
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
 
    console.log('Id is ' + _id);
    for (let index = 0; index < data.length; index++) {
        console.log(data[index].id);
                if (data[index].id === _id) {
                    console.log(data[index].id + ' WWWWW ' + _id)
                    return index
                }
            }
}

function createNEWnote(note) {
    const { textarea, id } = note;
    if (!textarea) return;

    const divForNote = document.createElement('div');
    divForNote.className = 'yellowNote col-lg-2 col-sm-4';
    console.log('DIVFORNOTE ID ' + id)
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
    // checkButt.addEventListener("click",  )

    const divForButtons = document.createElement('div');
    divForButtons.className = 'divForButtons';

    const noteText = document.createElement('p');
    noteText.innerText = textarea;
    noteText.className = 'YellowNoteText';

    const newNoteTime = document.createElement('p');
    newNoteTime.id = "noteTime";
    // newNoteTime.innerText = clockF();
    
    divForButtons.append(checkButt,deleteButt)
    divForNote.append(divForButtons,noteText,newNoteTime);

    return divForNote;
}

function deleteNoteHandler() {
    console.log('Parent elemtn id ' + this.parentElement.id);
    deleteNote(this.parentElement.parentElement.id)
}

function validateNoteNum(textarea) {
    return findIndex(arrayOfData, textarea)
}

function saveNOTE(){
    const { textarea } = notes_DOM;
    id = 'task#' + Math.round(Math.random()*99);
    console.log('THIs is ' + textarea + ' and ' + id)
    const result = validateNoteNum(textarea.value, id);
    if (result !== undefined) {
        alert("Note already Exist!")
        return;
    }
    arrayOfData.push(new NOTE(textarea.value, id));
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData)
    // divForYellowNoteS.reset();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function NOTE(_textarea, _id){
    this.textarea = _textarea;
    this.id = _id;
    this.selected = false;
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("notesData")) || []
    draw(arrayOfData);
}

init();




// function clockF() {
    
//     var time = new Date();
//     var h = (time.getHours()%12).toString();
//     var m = time.getMinutes().toString();
//     var s = time.getSeconds().toString();

//     if ( h.length < 2){
//         h = '0'+ h;
//     }
//     if ( m.length < 2){
//         m = '0'+ m;
//     }
//     if ( s.length < 2){
//         s = '0'+ s;
//     }
//     var correntTime = h + ':' + m + ':' + s;
//     clock.textContent = correntTime;

//     return correntTime;

// }
// clockF();
// setInterval(clockF, 1000);
// const t = clockF();
// console.log(t);


// var dateT = new Date();
// var day = dateT.getDay().toString();
// var mns = dateT.getMonth().toString();
// var correntDay = day + ' ' + mns;
// nday.textContent = correntDay;