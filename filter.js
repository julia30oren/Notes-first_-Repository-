function getDoneNotes(){
    let doneNotes = arrayOfData.filter( note => note.name === 'Already Done : ');
    console.log(doneNotes);
    draw(doneNotes)
}

function getNewNotes(){
    let newNotes = arrayOfData.filter( note => note.name === 'New Note : ');
    console.log(newNotes);
    draw(newNotes)
}