var keepsHisWord;
keepsHisWord = true;
promise1 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word");
  } else {
    reject("The man doesnt want to keep his word");
  }
});
console.log(promise1);

promise2 = new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({
        message: "The man likes to keep his word",
        code: "aManKeepsHisWord"
      });
    }, 1 * 1000);
  });
console.log(promise2);

keepsHisWord = false;
promise3 = new Promise(function(resolve, reject) {
  if (keepsHisWord) {
    resolve("The man likes to keep his word");
  } else {
    reject("The man doesn't want to keep his word");
  }
});
console.log(promise3);