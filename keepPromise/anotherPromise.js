function getRandomNumber(start = 1, end = 10) {
    //works when both start and end are >=1
    return (parseInt(Math.random() * end) % (end - start + 1)) + start;
}

var promiseTRRARNOSG = (promiseThatResolvesRandomlyAfterRandomNumnberOfSecondsGenerator = function() {
  return new Promise(function(resolve, reject) {
    let randomNumberOfSeconds = getRandomNumber(2, 4);
    setTimeout(function() {
      let randomiseResolving = getRandomNumber(1, 10);
      if (randomiseResolving > 5) {
        resolve({
          randomNumberOfSeconds: randomNumberOfSeconds,
          randomiseResolving: randomiseResolving
        });
      } else {
        reject({
          randomNumberOfSeconds: randomNumberOfSeconds,
          randomiseResolving: randomiseResolving
        });
      }
    }, randomNumberOfSeconds * 1000);
  });
});

var testProimse = promiseTRRARNOSG();
testProimse.then(function(value) {
  console.log("Value when promise is resolved : ", value);
});
testProimse.catch(function(reason) {
  console.log("Reason when promise is rejected : ", reason);
});

for (i=1; i<=10; i++) {
    let promise = promiseTRRARNOSG();
    promise.then(function(value) {
      console.log("Value when promise is resolved : ", value);
    });
    promise.catch(function(reason) {
      console.log("Reason when promise is rejected : ", reason);
    });
  }