inputString.split('\n').map(e => e.split(',').map((f, i, arr) => +f.split('-')[1] >= +arr[1-i].split('-')[0])).filter(e => e[0] && e[1]).length
