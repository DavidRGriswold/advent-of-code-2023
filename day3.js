var fname = process.argv[2];
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let lines = fs.readFileSync(filePath).toString().split("\n");

let sum = 0;
for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    // find numbers
    let numMatches = [...line.matchAll(/\d+/g)];
    // find the useful strings for each number
    for (let match of numMatches) {
        //console.log("checking " + match);
        let searchStrings = [];
        let minIndex = match.index > 0 ? match.index - 1 : 0;
        //console.log("min" + minIndex);
        let maxIndex = match.index + match.toString().length;
        //console.log("max" + maxIndex);
        //console.log(maxIndex);
        if (maxIndex < line.length - 1) maxIndex++;
        searchStrings.push(lines[i].trim().substring(minIndex, maxIndex));
        if (i > 0) {
            searchStrings.push(lines[i - 1].trim().substring(minIndex, maxIndex));
        }
        if (i < lines.length - 1) {
            searchStrings.push(lines[i + 1].trim().substring(minIndex, maxIndex));
        }
        // search the strings for symbols
        let hasSymbol = false;
        //console.log(searchStrings);
        for (let s of searchStrings) {
            if (s.match(/[^A-Z0-9a-z.]/)) hasSymbol = true;
        }
        if (hasSymbol) sum += Number(match.toString());
    }

}
console.log(sum);

// part 2
let sum2 = 0;
for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    // find stars
    let allStars = [...line.matchAll(/\*/g)];
    for (let star of allStars) {
        let ind = star.index;
        let numMatches = 0;
        let tempsum = 1;
        let nums = []
        if (i > 0) {
            // find all numbers in the previous line and see if any are adjacent
            nums = nums.concat([...lines[i - 1].trim().matchAll(/\d+/g)]);
        }
        if (i < lines.length - 1) {
            nums = nums.concat([...lines[i + 1].trim().matchAll(/\d+/g)]);
        }
        nums = nums.concat([...lines[i].trim().matchAll(/\d+/g)]);
        for (let num of nums) {
            if (num.index >= ind - num.toString().length && num.index <= ind + 1) {
                tempsum *= Number(num);
                numMatches++;
            }
        }
        if (numMatches == 2) sum2 += tempsum;
    }

}
console.log(sum2);