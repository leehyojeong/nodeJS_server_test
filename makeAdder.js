function makeAdder(x){
    var y = 1;

    return function(z){
        y=100;
        return x+y+z;
    };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));
console.log(add10(2));