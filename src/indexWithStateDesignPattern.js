class StopWatch2 {
  
  constructor(divElement){
    this.transitionTo = this.transitionTo.bind(this);
    this.initialization = this.initialization.bind(this);
    this.initialization(divElement);
    this.transitionTo(new StopState());
  }

  transitionTo(state){
    this.state = state;
    this.state.setContext(this);
    this.button1.innerText = this.state.getButton1Text();
    this.button2.innerText = this.state.getButton2Text();
  }

  initialization(divElement){
    this.containerStopWatch = divElement;

    this.counterDiv = document.createElement("div");
    this.counterP = document.createElement("p");

    this.buttonsDiv = document.createElement("div");
    this.button1 = document.createElement("button");
    this.button2 = document.createElement("button");

    this.lapsDiv = document.createElement("div");
    this.lapTable = document.createElement("table");
    this.headerTr = document.createElement("tr");
    var lapTh = document.createElement("th");
    var timeTh = document.createElement("th");
    
    this.containerStopWatch.classList.add('container-stopwatch');
    this.counterDiv.classList.add('counter-div');
    this.counterP.classList.add('p-counter');
    this.counterDiv.appendChild(this.counterP);
    this.containerStopWatch.appendChild(this.counterDiv);

    this.buttonsDiv.classList.add('buttons-div');
    this.buttonsDiv.appendChild(this.button1);
    this.buttonsDiv.appendChild(this.button2);
    this.containerStopWatch.appendChild(this.buttonsDiv);

    this.lapsDiv.classList.add('laps-div');
    lapTh.innerHTML = 'LAP';
    timeTh.innerHTML = 'TIME';
    this.headerTr.appendChild(lapTh);
    this.headerTr.appendChild(timeTh);

    this.lapTable.appendChild(this.headerTr);
    this.lapsDiv.appendChild(this.lapTable);

    this.containerStopWatch.appendChild(this.lapsDiv);

    this.handleButton1 = this.handleButton1.bind(this);
    this.handleButton2 = this.handleButton2.bind(this);
    this.button1.onclick = this.handleButton1;
    this.button2.onclick = this.handleButton2;

    this.setIntervalId = this.setIntervalId.bind(this);
    this.getIntervalId = this.getIntervalId.bind(this);
    this.updateTheStopWatch = this.updateTheStopWatch.bind(this);

    this.resetTimerVariables();

  }

  resetTimerVariables(){
    this.milisec = 0;
    this.sec = 0;
    this.min = 0;
    this.hour = 0;
    this.counterForLaps = 1;
    this.counterP.innerHTML = '00:00:00:00';
  }

  handleButton1(){
    this.state.handleButton1Click();
  }

  handleButton2(){
    this.state.handleButton2Click();
  }

  setIntervalId(id){
    this.intervalId = id;
  }

  getIntervalId(){
    return this.intervalId;
  }

  updateTheStopWatch(){
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
        this.reset();
      } else {
        strHour = this.hour.toString();
      }
    }

    this.counterP.innerHTML =
      strHour + ":" + strMin + ":" + strSec + ":" + strMilisec;
  }

  reset(){
    clearInterval(this.intervalId);
    this.deleteLapTable();
    this.resetTimerVariables();
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
    cell0.innerHTML = this.counterForLaps.toString();
    cell1.innerHTML = this.counterP.innerHTML;
    ++this.counterForLaps;
  }

}

class StopWatchState{

  constructor(){
    this.context;
    this.setContext = this.setContext.bind(this);
  }

  setContext(context){
    this.context = context;
  }

}


class StopState extends StopWatchState{

  constructor(){
    super()
    this.button1Text = 'START'
    this.button2Text = 'RESET'
    this.getButton1Text = this.getButton1Text.bind(this);
    this.getButton2Text = this.getButton2Text.bind(this);
  }

  getButton1Text(){
    return this.button1Text;
  }

  getButton2Text(){
    return this.button2Text;
  }

  handleButton1Click(){ // start button
    this.context.setIntervalId(setInterval(this.context.updateTheStopWatch,10));
    this.context.transitionTo(new RunningState());
  }

  handleButton2Click(){ // reset button
    clearInterval(this.context.getIntervalId());
    this.context.deleteLapTable();
    this.context.resetTimerVariables();
  }
}

class RunningState extends StopWatchState{

  constructor(){
    super()
    this.button1Text = 'STOP'
    this.button2Text = 'LAP'
  }

  getButton1Text(){
    return this.button1Text;
  }

  getButton2Text(){
    return this.button2Text;
  }

  handleButton1Click(){ // stop button
    clearInterval(this.context.getIntervalId());
    this.context.transitionTo(new StopState());
  }
  handleButton2Click(){ // lap button
    this.context.addLap();
  }
}

var stopwatch = new StopWatch2(document.getElementById('stopwatch-div'));
