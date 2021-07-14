
class StopWatch {
  constructor(divElement) {
    this.containerStopWatch = divElement;
    this.counterDiv = $((document.createElement('div')));
    this.counterP = $((document.createElement('p')));

    this.buttonsDiv = $((document.createElement('div')));
    this.startBtn = $((document.createElement('button')));
    this.resetBtn = $((document.createElement('button')));

    this.lapsDiv = $((document.createElement('div')));
    this.lapTable = $((document.createElement('table')));
    this.headerTr = $((document.createElement('tr')));
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

    var lapTh = $((document.createElement('th')));
    lapTh.text('LAP');
    this.headerTr.append(lapTh);
    var timeTh = $((document.createElement('th')));
    timeTh.text('TIME');
    this.headerTr.append(timeTh);
    this.tHead = $((document.createElement('thead')));
    this.tHead.append(this.headerTr);
    
    this.tBody = $((document.createElement('tbody')));
    this.lapTable.append(this.tHead);
    this.lapTable.append(this.tBody);

    this.lapsDiv.append(this.lapTable);

    this.containerStopWatch.append(this.lapsDiv);

    this.startTheStopWatch = this.startTheStopWatch.bind(this);
    this.startBtn.on('click',this.startTheStopWatch);

    this.handleResetButton = this.handleResetButton.bind(this);
    this.resetBtn.on('click',this.handleResetButton);
    this.resetBtn.disabled = true;

    this.deleteLapTable = this.deleteLapTable.bind(this);
    this.addLap = this.addLap.bind(this);
    this.resetTimeVariables = this.resetTimeVariables.bind(this);
    this.updateTheStopWatch = this.updateTheStopWatch.bind(this);

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
    this.counterP.text("00:00:00:00");
  },
  startTheStopWatch : function(){
    this.resetBtn.disabled = false;
    if (!this.isRunning) {
      this.isRunning = true;
      this.startBtn.text("STOP");
      this.resetBtn.text("LAP");
      this.intervalId = setInterval(this.updateTheStopWatch, 10);
    } else {
      clearInterval(this.intervalId);
      this.startBtn.text("START");
      this.isRunning = false;
      this.resetBtn.text("RESET");
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
    this.tBody.empty();
  },
  addLap : function(){
    var row = '<tr><td>' + this.counterForLaps +
     '</td><td>' + this.counterP.text() + '</td></tr>';
    
    this.tBody.append(row);
    ++this.counterForLaps;
  },
  updateTheStopWatch : function(){
    this.milisec += 10;
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
  var stopwatch = new StopWatch($('#stopwatch-div'));
});
