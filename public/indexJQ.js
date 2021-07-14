
class StopWatch {
  constructor(divElement) {
    this.containerStopWatch = divElement;
    this.counterDiv = $('div');
    this.counterP = $('p');

    this.buttonsDiv = $('div');
    this.startBtn = $('button');
    this.resetBtn = $('button');

    this.lapsDiv = $('div');
    this.lapTable = $('table');
    this.headerTr = $('tr');
    this.intervalId;
    this.isRunning = false;
    this.counterForLaps = 1;
    this.milisec;
    this.sec;
    this.min;
    this.hour;

    this.containerStopWatch.addClass('container-stopwatch');
    this.counterDiv.addClass('counter-div');

    this.counterP.addClass('p-counter');

    this.counterDiv.append(this.counterP);
    this.containerStopWatch.append(this.counterDiv);

    this.buttonsDiv.addClass('buttons-div');
    this.startBtn.text('START');
    this.buttonsDiv.append(this.startBtn);
    this.resetBtn.text('RESET');
    this.buttonsDiv.append(this.resetBtn);

    this.containerStopWatch.append(this.buttonsDiv);

    this.lapsDiv.addClass('laps-div');

    var lapTh = $('th');
    lapTh.text('LAP');
    this.headerTr.append(lapTh);
    var timeTh = $('th');
    timeTh.text('TIME');
    this.headerTr.append(timeTh);

    this.lapTable.append(this.headerTr);
    this.lapsDiv.append(this.lapTable);

    this.containerStopWatch.append(this.lapsDiv);

    this.resetTimeVariables();
  }
}

$.extend(StopWatch.prototype,{
  resetTimeVariables : function(){
    this.isRunning = false;
    this.milisec = 0;
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.counterForLaps = 1;
    this.counterP.innerHTML = "00:00:00:00";
  },
  startTheStopWatch : function(){
    this.resetBtn.disabled = false;
    if (!this.isRunning) {
      this.isRunning = true;
      this.startBtn.innerText = "STOP";
      this.resetBtn.innerText = "LAP";
      this.intervalId = setInterval(this.updateTheStopWatch, 10);
    } else {
      clearInterval(this.intervalId);
      this.startBtn.innerText = "START";
      this.isRunning = false;
      this.resetBtn.innerText = "RESET";
    }
  },
  handleResetButton: function(){
    if (this.isRunning) {
      this.addLap();
    } else {
      clearInterval(this.intervalId);
      this.deleteLapTable();
      this.resetTimeVariables();
    }
  },
  deleteLapTable : function(){
    var lenTable = this.lapTable.rows.length;

    // console.log('table length : ' + lenTable);
    for (var i = 1; i < lenTable; ++i) 
      this.lapTable.deleteRow(1);

    // console.log('table length : ' + tableElement.rows.length);
  },
  addLap : function(){
    var row = this.lapTable.insertRow(1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    cell0.innerHTML = this.counterForLaps;
    cell1.innerHTML = this.counterP.innerHTML;
    ++this.counterForLaps;
  },
  updateTheStopWatch : function(){
    this.milisec += 10;
    // console.log('milisec: ' + this.milisec + ', sec: ' + this.sec);
    var strMilisec = "";
    var strSec = "";
    var strMin = "";
    var strHour = "";
    if (this.milisec < 100) {
      strMilisec = "0" + this.milisec / 10;
    } else {
      if (this.milisec === 1000) {
        this.sec += 1;
        this.milisec = 0;
        strMilisec = "00";
      } else {
        strMilisec = (this.milisec / 10).toString();
      }
    }

    if (this.sec < 10) {
      strSec = "0" + this.sec;
    } else {
      if (this.sec === 60) {
        this.min += 1;
        this.sec = 0;
        strSec = "00";
      } else {
        strSec = this.sec.toString();
      }
    }

    if (this.min < 10) {
      strMin = "0" + this.min;
    } else {
      if (this.min === 60) {
        this.hour += 1;
        this.min = 0;
        strMin = "00";
      } else {
        strMin = this.min.toString();
      }
    }

    if (this.hour < 10) {
      strHour = "0" + this.hour;
    } else {
      if (this.hour === 24) {
        this.handleResetButton();
      } else {
        strHour = this.hour.toString();
      }
    }

    this.counterP.text(strHour + ":" + strMin + ":" + strSec + ":" + strMilisec);
  }
})

$(document).ready(function(){
  
});
