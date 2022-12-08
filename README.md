# aoc22
My solutions to the 2022's edition of [Advent of Code](https://adventofcode.com).

## Special Challenge
I'll try to solve the problems using only "one line" of javascript code, meaning no semicolon nor space return allowed.

Most of it is made directly in Firefox's browser devtools. The console is a powerful testing tool!

Day 7 update: Firefox team, please make the one line parsing longer, stopping after a while is unfair to my challenge :'(

After struggling with some of the harder challenges, I'll allow myself to use window variables (but they can't be set beforehand).

This code is not made to be proper nor human readable, but mostly a fun challenge for me. Don't expect it to be performant or beautiful!

## Day 1
### Part 1
This was done at work during a project build. After a friend found it funny that I was using one liners, it started the whole special rules chaos
```js
inputString.split('\n\n').map(e = e.split('\n').reduce((a,b) => +a+(+b), 0)).sort((a,b) => a < b)[0]
```
### Part 2
Kinda straightforward, nothing to really comment here
```js
inputString.split('\n\n').map(e = e.split('\n').reduce((a,b) => +a+(+b), 0)).sort((a,b) => a < b).splice(0,3).reduce((a,b)=>a+b, 0)
```
## Day 2
### Part 1
There is no need to make something smart when there is only a few cases to cover. I manually calculated all of the cases
```js
inputString.split('\n').map(e => { return {'A X': 4, 'A Y': 8, 'A Z': 3, 'B X': 1, 'B Y': 5, 'B Z': 9, 'C X': 2, 'C Y': 7, 'C Z': 6, '': 0}[e] }).reduce((a,b) => a+b, 0)
```
### Part 2
This made me notice that for X, Y, Z, all A, B and C combination sum to 15, the B doesn't change and you get all numbers 1 through 9. Pretty fun 
```js
inputString.split('\n').map(e => { return {'A X': 3, 'A Y': 4, 'A Z': 8, 'B X': 1, 'B Y': 5, 'B Z': 9, 'C X': 2, 'C Y': 6, 'C Z': 7, '': 0}[e] }).reduce((a,b) => a+b, 0)
```
## Day 3
### Part 1
I could have just added a "-" character on my alphabet string instead of doing + 1, but it works anyway
```js
inputString.split('\n').map(e => e.slice(0, e.length/2).split('').map(f => e.slice(e.length/2).includes(f) ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(f) + 1 : 0 ).find(a => a !== 0)).reduce((a, b) => a + b, 0)
```
### Part 2
I derped a bit on something so this took way longer than it should have
```js
inputString.split(/([a-zA-Z]+\n[a-zA-Z]+\n[a-zA-Z]+)\n/).filter(a => a !== '').map(e => e.split('\n')[0].split('').map(f => e.split('\n')[1].includes(f) && e.split('\n')[2].includes(f) ? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(f) + 1 : 0 ).find(a => a !== 0)).reduce((a, b) => a + b, 0)
```
## Day 4
### Part 1
The challenges start to be a bit tricky, but overall are still pretty straightforward
```js
inputString.split('\n').map(e => e.split(',').map((f, i, arr) => +f.split('-')[0] < +arr[1-i].split('-')[0] || +f.split('-')[1] > +arr[1-i].split('-')[1])).filter(e => !e[0] || !e[1]).length
```
### Part 2
Might seem harder than part 1, but just need to focus on what conditions satisfy the thing we need
```js
inputString.split('\n').map(e => e.split(',').map((f, i, arr) => +f.split('-')[1] >= +arr[1-i].split('-')[0])).filter(e => e[0] && e[1]).length
```
## Day 5
### Part 1
First real trouble of this run
```js
inputString.split('\n\n').flatMap((e, i) => i === 0 ? [e, e] : e).map((e, i) => i === 0 ? e.split('\n').forEach((f, j) => j === 0 ? window.iwanttodie = Array(Math.ceil(f.length / 4)).fill().map(_ => []) : '') : i === 1 ? e.split('\n').forEach(f => f.split(/(   |\[[A-Z]\]) /).filter(g => g !== '' && g.trim()[0] !== '1').forEach((g, k) => g.trim() !== '' ? window.iwanttodie[k].push(g) : '')) : e.split('\n').forEach(f => f.split(/move (\d+) from (\d+) to (\d+)/).filter(f => f !== '').map(f => parseInt(f)).map((_, k, arr) => k === 0 ? window.iwanttodie[arr[2]-1].unshift(...window.iwanttodie[arr[1]-1].splice(0, arr[0]).reverse()) : ''))).map(e => window.iwanttodie)[0].map(e => e[0].trim().substring(1, e[0].length-1)).reduce((a, b) => a+b, '');
```
### Part 2
We just need to remove the .reverse() for this part
```js
inputString.split('\n\n').flatMap((e, i) => i === 0 ? [e, e] : e).map((e, i) => i === 0 ? e.split('\n').forEach((f, j) => j === 0 ? window.iwanttodie = Array(Math.ceil(f.length / 4)).fill().map(_ => []) : '') : i === 1 ? e.split('\n').forEach(f => f.split(/(   |\[[A-Z]\]) /).filter(g => g !== '' && g.trim()[0] !== '1').forEach((g, k) => g.trim() !== '' ? window.iwanttodie[k].push(g) : '')) : e.split('\n').forEach(f => f.split(/move (\d+) from (\d+) to (\d+)/).filter(f => f !== '').map(f => parseInt(f)).map((_, k, arr) => k === 0 ? window.iwanttodie[arr[2]-1].unshift(...window.iwanttodie[arr[1]-1].splice(0, arr[0])) : ''))).map(e => window.iwanttodie)[0].map(e => e[0].trim().substring(1, e[0].length-1)).reduce((a, b) => a+b, '');
```
## Day 6
### Part 1
Pretty simple day overall, a nice break of pace from the last one
```js
inputString.split('').findIndex((a, i, arr) => i > 2 && !(arr.slice(i-3, i).map((b, j, array)  => [...array.slice(0, j), ...array.slice(j+1)].includes(b)).reduce((t, s) => t || s, false)) && !arr.slice(i-3, i).includes(a)) + 1
```
### Part 2
Just change some numbers
```js
inputString.split('').findIndex((a, i, arr) => i > 12 && !(arr.slice(i-13, i).map((b, j, array)  => [...array.slice(0, j), ...array.slice(j+1)].includes(b)).reduce((t, s) => t || s, false)) && !arr.slice(i-13, i).includes(a)) + 1
```
## Day 7
### Part 1
This code is actually bugged, but worked for the day because the last chain of directories doesn't have a directory with less than 100000
```js
inputString.split('\n').flatMap((e, i) => i === 0 ? [e, e, e] : e).map((e, i) => i === 0 ? window.dirSizes = {} : i === 1 ? window.dirStack = [] : e.substring(0, 4) === '$ cd' ? e.substring(5) === '..' ? (window.dirSizes[window.dirStack.slice(0, -1).reduce((a, b) => a + '/' + b, '')] += window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')]) | window.dirStack.pop() : window.dirStack.push(e.substring(5)) : e.substring(0, 4) === '$ ls' ? window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')] = 0 : e.split(' ')[0] === 'dir' ? '' : window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')] += parseInt(e.split(' ')[0])).map(e => Object.keys(window.dirSizes))[0].map(a => window.dirSizes[a]).reduce((a, b) => b > 100000 ? a : a + b, 0)
```
### Part 2
A bit of changes were needed, but overall the hardest was to realize part 1 was glitched and fix that
```js
inputString.split('\n').flatMap((e, i) => i === 0 ? [e, e, e] : e).map((e, i) => i === 0 ? window.dirSizes = {} : i === 1 ? window.dirStack = [] : e.substring(0, 4) === '$ cd' ? e.substring(5) === '..' ? (window.dirSizes[window.dirStack.slice(0, -1).reduce((a, b) => a + '/' + b, '')] += window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')]) | window.dirStack.pop() : window.dirStack.push(e.substring(5)) : e.substring(0, 4) === '$ ls' ? window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')] = 0 : e.split(' ')[0] === 'dir' ? '' : window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')] += parseInt(e.split(' ')[0])).map((e, i) => i === 0 ? Array(window.dirStack.length).fill(0) : Object.keys(window.dirSizes)).slice(0, 3).map((e, i) => i === 0 ? e.forEach(_ => (window.dirSizes[window.dirStack.slice(0, -1).reduce((a, b) => a + '/' + b, '')] += window.dirSizes[window.dirStack.reduce((a, b) => a + '/' + b, '')]) | window.dirStack.pop()) : e).slice(1).map(a => a.map(b => window.dirSizes[b]).sort((a, b) => a-b)).map((e, i) => i === 0 ? window.neededSpace = 30000000 - 70000000 + e[e.length-1] : e)[1].find(a => a > window.neededSpace)
```
## Day 8
### Part 1
Working with arrays again urghhhhh
```js
inputString.split('\n').flatMap((e, i) => i === 0 ? [e, e] : e).map((e, i) => i === 0 ? window.trees = [] : window.trees[i-1] = e.split('').map(f => {return { h: parseInt(f) }})).reduce(() => window.trees).map((row, i) => row.forEach((tree, j) =>  i === 0 || j === 0 || i === (window.trees.length-1) || j === (row.length-1) ? tree.visible = true : row.slice(0, j).every(tl => tl.h < tree.h) || row.slice(j+1).every(tr => tr.h < tree.h) || Array(i).fill(0).every((_, tu) => window.trees[tu][j].h < tree.h) || Array(window.trees.length - (i+1)).fill(0).every((_, td) => window.trees[window.trees.length - td - 1][j].h < tree.h) ? tree.visible = true : '')).reduce(() => window.trees).reduce((c, d) => c + d.reduce((a, b) => b.visible ? a + 1 : a, 0), 0)
```
### Part 2
```js

```
## Day 9
### Part 1
```js

```
### Part 2
```js

```
## Day 10
### Part 1
```js

```
### Part 2
```js

```
## Day 11
### Part 1
```js

```
### Part 2
```js

```
## Day 12
### Part 1
```js

```
### Part 2
```js

```
## Day 13
### Part 1
```js

```
### Part 2
```js

```
## Day 14
### Part 1
```js

```
### Part 2
```js

```
## Day 15
### Part 1
```js

```
### Part 2
```js

```
## Day 16
### Part 1
```js

```
### Part 2
```js

```
## Day 17
### Part 1
```js

```
### Part 2
```js

```
## Day 18
### Part 1
```js

```
### Part 2
```js

```
## Day 19
### Part 1
```js

```
### Part 2
```js

```
## Day 20
### Part 1
```js

```
### Part 2
```js

```
## Day 21
### Part 1
```js

```
### Part 2
```js

```
## Day 22
### Part 1
```js

```
### Part 2
```js

```
## Day 23
### Part 1
```js

```
### Part 2
```js

```
## Day 24
### Part 1
```js

```
### Part 2
```js

```
## Day 25
### Part 1
```js

```
### Part 2
```js

```
