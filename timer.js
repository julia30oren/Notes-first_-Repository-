let time = document.getElementById("clock");
let date = document.getElementById("day")

function clockF() {  
    var now = new Date();
    now = now.getTime();
    // var deadLine = new Date(0000,00,00,0,0,0);
    // var correntTime = now.getTime();
    // var deadLineTime = deadLine.getTime();
    // var remTimeForTask = deadLineTime-correntTime;

    var s = Math.floor(now/1000);
    var m = Math.floor(s/60);
    var h = Math.floor(m/60)+3;
    // var d = now.getDate();
  h %= 24;
  m %= 60;
  s %= 60;
  h = (h<10) ? "0" + h : h;
  m = (m<10) ? "0" + m : m;
  s = (s<10) ? "0" + s : s;

  time.innerHTML = h + ":" + m + ":" + s ;
//   date.innerHTML = d;
//   console.log(d);
}
setInterval(clockF, 1000);
clockF();
