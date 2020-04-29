function getRandomNumber(start = 1, end = 10) {
    //works when both start and end are >=1
    return (parseInt(Math.random() * end) % (end - start + 1)) + start;
}

var promiseTRRARNOSG = (promiseThatResolvesRandomlyAfterRandomNumnberOfSecondsGenerator = function() {
    return new Promise(function(resolve, reject) {
      let randomNumberOfSeconds = getRandomNumber(2, 10);
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

  var promiseTRSANSG = (promiseThatResolvesAfterNSecondsGenerator = function(
    n = 0
  ) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve({
          resolvedAfterNSeconds: n
        });
      }, n * 1000);
    });
  });
  var promiseTRJANSG = (promiseThatRejectsAfterNSecondsGenerator = function(
    n = 0
  ) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        reject({
          rejectedAfterNSeconds: n
        });
      }, n * 1000);
    });
  });

// var promise1 = promiseTRSANSG(3);
// promise1.then(function(result) {
//   console.log(result);
// });

async function testAsync() {
    for (var i = 0; i < 5; i++) {
      try {
        result1 = await promiseTRRARNOSG();
        console.log("Result 1 ", result1);
        result2 = await promiseTRRARNOSG();
        console.log("Result 2 ", result2);
      } catch (e) {
        console.log("Error", e);
      } finally {
        console.log("This is done");
      }
    }
  }
  
  testAsync()