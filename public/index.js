
var milisec = 0;
var isRunning = false;
var timerPElement = document.getElementById('p-counter');
var startBtn = document.getElementById('start-btn');
var resetBtn = document.getElementById('reset-btn');
var intervalId;

startBtn.onclick = startTheStopWatch;
resetBtn.onclick = resetTheStopWatch;

function startTheStopWatch(){
    // isRunning = true;
    // console.log('start')
    intervalId = setInterval(function(){
        milisec += 1;
        timerPElement.innerHTML = milisec;
    },1);
}


function resetTheStopWatch(){
    clearInterval(intervalId);
    // console.log('stop')
    // isRunning = false;
    milisec = 0;
}


