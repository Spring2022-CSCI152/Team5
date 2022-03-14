const normalise = (value, pomodoroLength) => ((value - 0) * 100) / (convMinSec(pomodoroLength) - 0);

export const convMinSec = minuteValue => minuteValue * 60;

export const formatSeconds = (timerSeconds) => {
    return `${Math.floor(timerSeconds/60)}:${(timerSeconds % 60 > 9) ? timerSeconds % 60 : '0' + timerSeconds % 60}`;
}

export default { normalise, convMinSec, formatSeconds }