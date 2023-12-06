var fname = process.argv[2];
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, fname);

let sections = fs.readFileSync(filePath).toString().split("\r\n\r\n");

//seeds
let seeds = sections[0]
    .split(": ")[1]
    .split(" ")
    .map(a => Number(a));

//this would have been nice but the numbers are too big
// let seeds2 = [];
// for (let i = 0; i < seeds.length; i+=2) {
//     for (j = 0; j<seeds[i+1];j++) {
//         seeds2.push(seeds[i]+j);
//     }
// }
sections.shift();
let maps = sections.map(a => processMap(a));

locations = seeds.map(a =>
    maps.reduce(findDestination, a));

// part 1 answer
console.log(locations.sort((a, b) => a - b)[0]);

// part 2 completion
let minLoc = maps.reduce(findDestination, seeds[0]);
for (let i = 0; i < seeds.length; i += 2) {
    for (let j = seeds[i]; j < seeds[i] + seeds[i + 1]; j++) {
        let curLoc = maps.reduce(findDestination, j);
        if (curLoc < minLoc) minLoc = curLoc;
    }
}
//part2 answer
console.log(minLoc);

/** convert a section of text into an array of arrays
 sorted via the source range start point
 */
function processMap(mapText) {
    let array = mapText.split("\r\n");
    array.shift();
    return array
        .map(a => a.split(" ")
            .map(b => Number(b)))
        .sort((a, b) => a[1] - b[1])
}

/**
 * given a value and a single map, return the destination value
 * @param {*} value 
 * @param {*} map 
 * @returns 
 */
function findDestination(value, map) {
    //return the destination position given a value and a map
    for (let row of map) {
        if (row[1] <= value && row[1] + row[2] > value) {
            return row[0] + (value - row[1]);
        }
    }
    return value;
}
