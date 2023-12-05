var fname = process.argv[2];
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\r\n");
let sum = 0;
let scores = [];
for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    let parts = line.split("| ");
    let id = i+1;
    let winners = parts[0].trim().split(": ")[1].split(/ +/g);
    let mine = parts[1].trim().split(/ +/g);
    let score = 0;
    scores[i]=0;
    for (let m of mine) {
        if (winners.includes(m)) {
            scores[i]++;
            if (score == 0) score = 1; else score*=2;
        }
    }
    sum += score;
}
console.log(sum);

// part 2
// scores keeps track of how many new cards each ticket won
// counts keeps track of how many of each card we have
let counts = new Array(lines.length);
counts.fill(1); // start with 1 of each card
let sum2 = 0;
for (let i = 0; i < counts.length; i++) {
    for (let j = i + 1; j < i + scores[i] + 1; j++) {
        counts[j] += counts[i]; // add one of the cards for each copy of the current card
    }
    sum2 += counts[i];
}

console.log(sum2);


// part 2 the BAD version, wow
// for (let i = 0; i < lines.length; i++) {
//     let line = lines[i]
//     let parts = line.split("| ");
//     let id = Number(parts[0].split(":")[0].split(" ")[1]);
//     let winners = parts[0].trim().split(": ")[1].split(/ +/g);
//     let mine = parts[1].trim().split(/ +/g);
//     let score = 0;
//     for (let m of mine) {
//         if (winners.includes(m)) {
//             score++;
//         }
//     }
//     // win copies of the next *score* cards by
//     // inserting them right after this one
//     let insertions = originalLines.slice(id,id+score);
//     //console.log(id);
//     lines.splice(i+1,0,...insertions);
// }
//console.log(lines.length);