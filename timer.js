
  
// let deadLineMonth = arrayOfData.map(note => note.deadLineMonth);
//   console.log(deadLineMonth);
  
// let deadLineDay = arrayOfData.map(note => note.deadLineDay);
//   console.log(deadLineDay);

addTimer();

function addTimer(array){
    for ( i=0; i<array.length; i++){
        clockF(array[i])}
        
        saveToLocalStorage("notesData", arrayOfData);
        draw(arrayOfData);
    }

    // var deadLine = new Date(deadLineYear,deadLineMonth,deadLineDay,0,0,0);
    // console.log(deadLine);

//     var now = new Date();
        

//     var correntTime = now.getTime();
//     var deadLineTime = deadLine.getTime();
//     var remTimeForTask = deadLineTime-correntTime;

//     var s = Math.floor(remTimeForTask/1000);
//     var m = Math.floor(s/60);
//     var h = Math.floor(m/60);
//     var d = Math.floor(h/60);
//   h %= 24;
//   m %= 60;
//   s %= 60;
//   h = (h<10) ? "0" + h : h;
//   m = (m<10) ? "0" + m : m;
//   s = (s<10) ? "0" + s : s;
  
// //   note.timer = d + " days " + h + ":" + m + ":" + s;
//         note.timer = "123";
//         console.log(note);
//     })
//     // setInterval(clockF, 1000);
//     console.log(arrayOfData);

//     saveToLocalStorage("notesData", arrayOfData);
//     draw(arrayOfData);
// }

function clockF(note) {
    
    var now = new Date();
    var deadLine = new Date(deadLineYear,deadLineMonth,deadLineDay,0,0,0);

    var correntTime = now.getTime();
    var deadLineTime = deadLine.getTime();
    var remTimeForTask = deadLineTime-correntTime;

    var s = Math.floor(remTimeForTask/1000);
    var m = Math.floor(s/60);
    var h = Math.floor(m/60);
    var d = Math.floor(h/60);
  h %= 24;
  m %= 60;
  s %= 60;
  h = (h<10) ? "0" + h : h;
  m = (m<10) ? "0" + m : m;
  s = (s<10) ? "0" + s : s;

  remTimeForTask = d + " days " + h + ":" + m + ":" + s;
  console.log(remTimeForTask)
}
setInterval(clockF, 1000);
