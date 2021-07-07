

var timerPElement = document.getElementById('p-counter');
var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var intervalId;
var milisec = 0;
var sec = 0;
var min = 0;
var hour = 0;

startBtn.onclick = startTheStopWatch;
resetBtn.onclick = resetTheStopWatch;

function startTheStopWatch(){
    // isRunning = true;
    // console.log('start')
    intervalId = setInterval(function(){
        milisec += 10;
        timerPElement.innerHTML = milisec;
        updateTheStopWatch();
    },10);
}


function resetTheStopWatch(){
    clearInterval(intervalId);
    // console.log('stop')
    // isRunning = false;
    milisec = 0;
    sec = 0;
    min = 0;
    hour = 0;
    timerPElement.innerHTML = '00:00:00:00';
}


function updateTheStopWatch(){
    // timerPElement.innerHTML = milisec
    var strMilisec = ''
    var strSec = ''
    var strMin = ''
    var strHour = ''
    if( milisec < 100 ){
        strMilisec = '0' + milisec;
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
            resetTheStopWatch();
        }
        else{
            strHour = hour.toString();
        }
    }

    timerPElement.innerHTML = strHour + ':' + strMin + ':' + strSec + ':' + strMilisec
}

