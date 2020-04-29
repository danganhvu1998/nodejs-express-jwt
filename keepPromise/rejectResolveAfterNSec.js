var promiseTRSANSG = (promiseThatResolvesAfterNSecondsGenerator = function(n = 0) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                resolvedAfterNSeconds: n
            });
        }, n * 1000);
    });
});

var promiseTRJANSG = (promiseThatRejectsAfterNSecondsGenerator = function(n = 0) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject({
                rejectedAfterNSeconds: n
            });
        }, n * 1000);
    });
});

// console.time("Promise.All");
// var promisesArray = [];
// promisesArray.push(promiseTRSANSG(1));
// promisesArray.push(promiseTRSANSG(4));
// promisesArray.push(promiseTRSANSG(2));
// var handleAllPromises = Promise.all(promisesArray);
// handleAllPromises.then(function(values) {
//   console.timeEnd("Promise.All");
//   console.log("All the promises are resolved", values);
// });
// handleAllPromises.catch(function(reason) {
//   console.log("One of the promises failed with the following reason", reason);
// });

console.time("Promise.All");
var promisesArray = [];
promisesArray.push(promiseTRSANSG(1));
promisesArray.push(promiseTRSANSG(5));
promisesArray.push(promiseTRSANSG(3));
promisesArray.push(promiseTRJANSG(2));
promisesArray.push(promiseTRSANSG(4));
var handleAllPromises = Promise.all(promisesArray);
handleAllPromises.then(function(values) {
  console.timeEnd("Promise.All");
  console.log("All the promises are resolved", values);
});
handleAllPromises.catch(function(reason) {
  console.timeEnd("Promise.All");
  console.log("One of the promises failed with the following reason ", reason);
});