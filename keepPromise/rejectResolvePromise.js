var promise3 = Promise.reject("Not interested");
promise3.then(function(value){
  console.log("This will not run as it is a resolved promise. The resolved value is ", value);
});
promise3.catch(function(reason){
  console.log("This run as it is a rejected promise. The reason is ", reason);
});

var promise4 = Promise.resolve(1);
promise4.then(function(value){
  console.log("This will run as it is a resovled promise. The resolved value is ", value);
});
promise4.then(function(value){
  console.log("This will also run as multiple handlers can be added. Printing twice the resolved value which is ", value * 2);
});
promise4.catch(function(reason){
  console.log("This will not run as it is a resolved promise", reason);
});