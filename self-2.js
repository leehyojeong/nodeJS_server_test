// 1
function myfunc(){
    var self = this;

    $('#button').click(function(){
        self.doSomething
    });
}

// 2
function myfunc(){
    $('#button').click(function(){
        this.doSomething
    }.bind(this));
}