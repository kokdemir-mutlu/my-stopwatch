

var timerPElement = document.getElementById('p-counter');
resetTimeVariables();
var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var intervalId;
var isRunning = false;
var counterForLaps = 1;

startBtn.onclick = startTheStopWatch;
resetBtn.onclick = handleResetButton;

function startTheStopWatch(){
    resetBtn.disabled = false;
    if(!isRunning){
        isRunning = true;
        startBtn.innerText = 'Stop';
        resetBtn.innerText = 'Lap';
        intervalId = setInterval(function(){
            milisec += 10;
            updateTheStopWatch();
        },10);
    }
    else{
        clearInterval(intervalId);
        startBtn.innerText = 'Start';
        isRunning = false;
        resetBtn.innerText = 'Reset';
    }
}


function handleResetButton(){
    if(isRunning){
        addLap();
    }
    else{
        clearInterval(intervalId);
        isRunning = false;
        deleteLapTable();
        resetTimeVariables();
    }

}

function resetTimeVariables(){
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;
    timerPElement.innerHTML = '00:00:00:00';
}

function deleteLapTable(){
    var tableElement = document.getElementById('lap-table');
    var lenTable = tableElement.rows.length;
    // console.log('table length : ' + lenTable);
    for(var i = 1; i < lenTable; ++i)
        tableElement.deleteRow(1);
    // console.log('table length : ' + tableElement.rows.length);
}

function addLap(){
    var tableElement = document.getElementById('lap-table');
    var row = tableElement.insertRow(1);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    cell0.innerHTML = counterForLaps;
    cell1.innerHTML = timerPElement.innerHTML;
    ++counterForLaps;
}

function updateTheStopWatch(){
    var strMilisec = ''
    var strSec = ''
    var strMin = ''
    var strHour = ''
    if( milisec < 100 ){
        strMilisec = '0' + (milisec/10);
    }
    else{
        if( milisec === 1000 ){
            sec += 1
            milisec = 0
            strMilisec = '00'
        }
        else{
            strMilisec = (milisec / 10).toString();
        }
    }

    if( sec < 10 ){
        strSec = '0' + sec;
    }
    else{
        if( sec === 60 ){
            min += 1
            sec = 0
            strSec = '00'
        }
        else{
            strSec = sec.toString();
        }
    }

    if( min < 10 ){
        strMin = '0' + min;
    }
    else{
        if( min === 60 ){
            hour += 1;
            min = 0;
            strMin = '00'
        }
        else{
            strMin = min.toString();
        }
    }

    if( hour < 10 ){
        strHour = '0' + hour;
    }
    else{
        if( hour === 24 ){
            handleResetButton();
        }
        else{
            strHour = hour.toString();
        }
    }

    timerPElement.innerHTML = strHour + ':' + strMin + ':' + strSec + ':' + strMilisec
}

