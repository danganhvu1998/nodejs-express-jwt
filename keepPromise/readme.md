## refer:

+ https://hackernoon.com/understanding-async-await-in-javascript-1d81bb079b2c

## node:

+ Create a promise for each async call. 
    + Add all the promises to an array. 
    + Then pass the promises array to Promise.
    + All This in turn returns a single promise for which we can use await