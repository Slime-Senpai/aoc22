inputString.split('\n\n').map(e = e.split('\n').reduce((a,b) => +a+(+b), 0)).sort((a,b) => a < b).splice(0,3).reduce((a,b)=>a+b, 0)
