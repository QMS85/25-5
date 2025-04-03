let breakLength = 5;
let sessionLength = 25;
let timerLabel = "Session";
let timeLeft = sessionLength * 60;
let isRunning = false;
let intervalId;

document.getElementById("break-length").innerHTML = breakLength;
document.getElementById("session-length").innerHTML = sessionLength;
document.getElementById("time-left").innerHTML = formatTime(timeLeft);

document.getElementById("break-decrement").addEventListener("click", decrementBreak);
document.getElementById("break-increment").addEventListener("click", incrementBreak);
document.getElementById("session-decrement").addEventListener("click", decrementSession);
document.getElementById("session-increment").addEventListener("click", incrementSession);
document.getElementById("start_stop").addEventListener("click", startStop);
document.getElementById("reset").addEventListener("click", reset);

function decrementBreak() {
    if (breakLength > 1) {
        breakLength--;
        document.getElementById("break-length").innerHTML = breakLength;
    }
}

function incrementBreak() {
    if (breakLength < 60) {
        breakLength++;
        document.getElementById("break-length").innerHTML = breakLength;
    }
}

function decrementSession() {
    if (sessionLength > 1) {
        sessionLength--;
        document.getElementById("session-length").innerHTML = sessionLength;
        if (timerLabel === "Session") {
            timeLeft = sessionLength * 60;
            document.getElementById("time-left").innerHTML = formatTime(timeLeft);
        }
    }
}

function incrementSession() {
    if (sessionLength < 60) {
        sessionLength++;
        document.getElementById("session-length").innerHTML = sessionLength;
        if (timerLabel === "Session") {
            timeLeft = sessionLength * 60;
            document.getElementById("time-left").innerHTML = formatTime(timeLeft);
        }
    }
}

function startStop() {
    if (!isRunning) {
        isRunning = true;
        intervalId = setInterval(decrementTime, 1000);
        document.getElementById("start_stop").innerHTML = "Stop";
    } else {
        isRunning = false;
        clearInterval(intervalId);
        document.getElementById("start_stop").innerHTML = "Start";
    }
}

function reset() {
    isRunning = false;
    clearInterval(intervalId);
    breakLength = 5;
    sessionLength = 25;
    timerLabel = "Session";
    timeLeft = sessionLength * 60;
    document.getElementById("break-length").innerHTML = breakLength;
    document.getElementById("session-length").innerHTML = sessionLength;
    document.getElementById("timer-label").innerHTML = timerLabel;
    document.getElementById("time-left").innerHTML = formatTime(timeLeft);
    document.getElementById("start_stop").innerHTML = "Start";
    document.getElementById("beep").currentTime = 0;
    document.getElementById("beep").pause();
}

function decrementTime() {
    timeLeft--;
    document.getElementById("time-left").innerHTML = formatTime(timeLeft);
    if (timeLeft === 0) {
        if (timerLabel === "Session") {
            timerLabel = "Break";
            timeLeft = breakLength * 60;
            document.getElementById("timer-label").innerHTML = timerLabel;
            document.getElementById("beep").play();
        } else {
            timerLabel = "Session";
            timeLeft = sessionLength * 60;
            document.getElementById("timer-label").innerHTML = timerLabel;
            document.getElementById("beep").play();
        }
    }
}

function formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
