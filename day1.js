var fname = process.argv[2];
console.log(fname);
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\n");
//content is an array of lines
console.log(lines);
let sum = 0;
let replacements = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, zero: 0,
    1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 0: 0
}
sum1 = 0;
sum2 = 0;
for (let line of lines) {
    let digits2 = line.match(/\d|one|two|three|four|five|six|seven|eight|nine|zero/g);
    let digits1 = line.match(/\d/g);
    sum1 += 10 * replacements[digits1[0]] + replacements[digits1[digits1.length - 1]];
    sum2 += 10 * replacements[digits2[0]] + replacements[digits2[digits2.length - 1]];
}

console.log(sum1);
console.log(sum2);