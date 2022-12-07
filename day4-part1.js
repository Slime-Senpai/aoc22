inputString.split('\n').map(e => e.split(',').map((f, i, arr) => +f.split('-')[0] < +arr[1-i].split('-')[0] || +f.split('-')[1] > +arr[1-i].split('-')[1])).filter(e => !e[0] || !e[1]).length
