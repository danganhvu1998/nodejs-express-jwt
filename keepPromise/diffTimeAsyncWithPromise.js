function executingAt() {
  return "--";
}

function getRandomNumber(start = 1, end = 10) {
  //works when both start and end are >=1
  return (parseInt(Math.random() * end) % (end - start + 1)) + start;
}

var promiseTRRARNOSG = (promiseThatResolvesRandomlyAfterRandomNumnberOfSecondsGenerator = function() {
  return new Promise(function(resolve, reject) {
    let randomNumberOfSeconds = getRandomNumber(3, 3);
    setTimeout(function() {
      let randomiseResolving = getRandomNumber(6, 10);
      if (randomiseResolving > 5) {
        resolve(randomiseResolving);
      } else {
        reject(randomiseResolving);
      }
    }, randomNumberOfSeconds * 1000);
  });
});

async function test(){
  for (score in [1,2,3]) {
    let randNum = await promiseTRRARNOSG();
    console.log( "test1", executingAt() )
    console.log(score, randNum)
  }
}

async function test2(){
  let singleUsersDetailsPromises = [];
  for (score in [1,2,3]) {
    let randNum = promiseTRRARNOSG()
    singleUsersDetailsPromises.push(randNum)
  } 
  let allUsersDetails = await Promise.all(singleUsersDetailsPromises);
  console.log( "test2", executingAt() )
  console.log(allUsersDetails);
}

async function hehe(){
  await test()
  await test2()
}

// Create a promise for each async call. 
// Add all the promises to an array. 
// Then pass the promises array to Promise.
// all This in turn returns a single promise for which we can use await
hehe()