//duration is in ms
export function displayTrackTime(duration_ms: number){
    var seconds = fetchTrackTimeins(duration_ms);
    var minutesPart = Math.floor(seconds/60);
    var secondsPart = Math.round(seconds%60).toLocaleString('en-us', {
        minimumIntegerDigits: 2,
        useGrouping: false
    });
    return minutesPart+':'+secondsPart;
}

export function fetchTrackTimeins(duration_ms: number){
    var seconds = (duration_ms / (1000));
    return seconds;
}

export function startTimer(elapsedTime_s: number){
    return setInterval(()=>{
        elapsedTime_s += 1;
    }, 1000);
}
