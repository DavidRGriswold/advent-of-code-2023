var fname = process.argv[2];
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\r\n");

let times = lines[0].split(/ +/g).slice(1).map(Number);
let records = lines[1].split(/ +/g).slice(1).map(Number);

// math: t(time - t) > r finds the first value that beats the record
// then there are time - 2t + 1 total values that break it
let winTimes = [];
let winTimesExplicit = [];
for (let i = 0; i < times.length; i++) {
    let t = 0;
    while (true) {
        if (t * (times[i]-t) > records[i]) break;
        if (t >= times[i]/2) break; //no solution
        t++;
    }
    let x = times[i]/2 - Math.sqrt(times[i]/2 * times[i]/2 - records[i]);
    winTimesExplicit.push(times[i]-2*Math.ceil(x) + 1);
    winTimes.push(times[i]-2*t+1);

}
console.log("Loop way");
console.log(winTimes.reduce((a,b)=>a*b,1));
console.log("Explicit way");
console.log(winTimesExplicit.reduce((a,b)=>a*b));
let time2 = Number(lines[0].split(/ +/g).slice(1).join(""));
let record2 = Number(lines[1].split(/ +/g).slice(1).join(""));
console.log(time2,record2);

let t = 0;
    while (true) {
        if (t * (time2-t) > record2) break;
        if (t >= time2/2) break; //no solution
        t++;  
    }
    console.log("Loop way part 2");
console.log(time2 - 2*t + 1);
console.log("Explicit way part 2");
let x = time2/2 - Math.sqrt(time2/2 * time2/2 - record2);
console.log(time2 - 2 * Math.ceil(x) + 1);

// faster direct calculation way
