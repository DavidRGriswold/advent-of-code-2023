var fname = process.argv[2];
console.log(fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\n");

let sum1 = 0,sum2=0;

for (line of lines) {
    line = line.trim();
    let split = line.split(/[:;]/g);
    let id = parseInt(split[0].match(/\d+/g));
    let possible = true;
    let minr=0,minb=0,ming=0;
    for (let i = 1; i < split.length; i++) {
        let plays = split[i].split(",")
        for (let play of plays) {
            let r = 0, b = 0, g = 0;
            let words = play.split(" ");
            if (words[2]=="blue") b = parseInt(words[1]);
            if (words[2]=="green") g = parseInt(words[1]);
            if (words[2]=="red") r = parseInt(words[1]);
            if (b >14 || r > 12 || g > 13) possible = false;
            minb = Math.max(b,minb);
            minr = Math.max(r,minr);
            ming = Math.max(g,ming)
        }

    }
    let power = minb * ming * minr;
    if (possible) sum1 += id;
    sum2 += power;
    
}
console.log(sum1);
console.log(sum2);