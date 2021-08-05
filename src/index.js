class StopWatch {
  constructor(divElement) {
    this.containerStopWatch = divElement;
    
    this.counterDiv = document.createElement("div");
    this.counterP = document.createElement("p");

    this.buttonsDiv = document.createElement("div");
    this.startBtn = document.createElement("button");
    this.resetBtn = document.createElement("button");

    this.lapsDiv = document.createElement("div");
    this.lapTable = document.createElement("table");
    this.headerTr = document.createElement("tr");
    
    this.intervalId;
    this.isRunning = false;
    this.counterForLaps = 1;
    this.milisec;
    this.sec;
    this.min;
    this.hour;

    this.containerStopWatch.classList.add("container-stopwatch");
    this.counterDiv.classList.add("counter-div");

    this.counterP.classList.add("p-counter");

    this.counterDiv.appendChild(this.counterP);
    this.containerStopWatch.appendChild(this.counterDiv);

    this.buttonsDiv.classList.add("buttons-div");
    this.startBtn.innerText = "START";
    this.buttonsDiv.appendChild(this.startBtn);
    this.resetBtn.innerText = "RESET";
    this.buttonsDiv.appendChild(this.resetBtn);

    this.containerStopWatch.appendChild(this.buttonsDiv);

    this.lapsDiv.classList.add("laps-div");

    var lapTh = document.createElement("th");
    lapTh.innerHTML = "LAP";
    this.headerTr.appendChild(lapTh);
    var timeTh = document.createElement("th");
    timeTh.innerHTML = "TIME";
    this.headerTr.appendChild(timeTh);

    this.lapTable.appendChild(this.headerTr);
    this.lapsDiv.appendChild(this.lapTable);

    this.containerStopWatch.appendChild(this.lapsDiv);

    this.startTheStopWatch = this.startTheStopWatch.bind(this);
    this.startBtn.onclick = this.startTheStopWatch;

    this.handleResetButton = this.handleResetButton.bind(this);
    this.resetBtn.onclick = this.handleResetButton;
    this.resetBtn.disabled = true;

    this.deleteLapTable = this.deleteLapTable.bind(this);
    this.addLap = this.addLap.bind(this);
    this.resetTimeVariables = this.resetTimeVariables.bind(this);
    this.updateTheStopWatch = this.updateTheStopWatch.bind(this);

    this.resetTimeVariables();
  }

  startTheStopWatch() {
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
  }

  handleResetButton() {
    if (this.isRunning) {
      this.addLap();
    } else {
      clearInterval(this.intervalId);
      this.deleteLapTable();
      this.resetTimeVariables();
    }
  }

  resetTimeVariables() {
    this.isRunning = false;
    this.milisec = 0;
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.counterForLaps = 1;
    this.counterP.innerHTML = "00:00:00:00";
  }

  deleteLapTable() {
    var lenTable = this.lapTable.rows.length;

    for (var i = 1; i < lenTable; ++i) 
      this.lapTable.deleteRow(1);

  }

  addLap() {
    var row = this.lapTable.insertRow(1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    cell0.innerHTML = this.counterForLaps;
    cell1.innerHTML = this.counterP.innerHTML;
    ++this.counterForLaps;
  }

  updateTheStopWatch() {
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

    this.counterP.innerHTML =
      strHour + ":" + strMin + ":" + strSec + ":" + strMilisec;
  }
}

var stopWatch = new StopWatch(document.getElementById("stopwatch-div"));

// var stopWatch2 = new StopWatch(document.getElementById('stopwatch-div2'));
