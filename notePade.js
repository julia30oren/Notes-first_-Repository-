const notes_DOM = {
    noteForm: document.getElementById('noteForm'),
    textarea: document.getElementById('exampleFormControlTextarea1'),
    divForYellowNoteS: document.getElementById('divForYellowNoteS'),
}

let arrayOfData = [{textarea:';kfjnvl3kwbjv ;lkdv lkdaj, sjkhdf'}];

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
    memo_note.className = "yellowNote col-lg-2 col-sm-4";
    memo_note.id = "yellowNote";
    if (!memo_note) return;
    divForYellowNoteS.append(memo_note);
}

function deleteNote (id){
    const ind = findIndex (arrayOfData, id);
    if (id === undefined) return;
    arrayOfData.splice(ind, 1)
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData);
}

function findIndex(data, THIStextarea) {
    for (let index = 0; index < data.length; index++) {
        if (data[index].textarea === THIStextarea) {
            return index
        }
    }
}

function createNEWnote(note) {
    const { textarea } = note;
    if (!textarea) return;

    const divForNote = document.createElement('div');
    divForNote.className = 'yellowNote';
    divForNote.id = 'task#' + Math.round(Math.random()*99);

    const deleteButt = document.createElement('button');
    deleteButt.innerHTML = icons.deleteIcon;
    deleteButt.className = "btn btn-danger";
    deleteButt.id = "bn";
    deleteButt.addEventListener("click",deleteNoteHandler)

    const checkButt = document.createElement('button');
    checkButt.innerHTML = icons.checkIcon;
    checkButt.className = "btn btn-success";
    checkButt.id = "bn";
    // deleteButt.addEventListener("click",  )

    const noteText = document.createElement('p');
    noteText.innerText = textarea;
    noteText.className = 'YellowNoteText';
    divForNote.append(checkButt,deleteButt,noteText);

    return divForNote;
}

function deleteNoteHandler() {
    deleteNote(this.parentElement.parentElement.id)
}

function validateNoteNum(textarea) {
    return findIndex(arrayOfData, textarea)
}

function saveNOTE(){
    const { textarea, divForYellowNoteS } = notes_DOM;
    
    const result = validateNoteNum(textarea.value);
    if (result !== undefined) {
        alert("Note already Exist!")
        return;
    }
    arrayOfData.push(new NOTE(textarea.value));
    saveToLocalStorage("notesData", arrayOfData);
    draw(arrayOfData)
    divForYellowNoteS.reset();
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function NOTE(_textarea){
    this.textarea = _textarea;
    this.selected = false;
}

function init() {
    arrayOfData = JSON.parse(localStorage.getItem("notesData")) || []
    draw(arrayOfData)
}

init();