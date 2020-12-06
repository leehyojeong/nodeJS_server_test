function test(f){
    f()
}

test(function(){
    console.log('Callback Function');
});