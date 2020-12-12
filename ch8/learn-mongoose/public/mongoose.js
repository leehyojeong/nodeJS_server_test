// 사용자 이름 눌렀을 때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach(function(el){
    el.addEventListener('click', function(){
        var id = el.querySelector('td').textContent;
        getComment(id);
    });
}); 

// 사용자 로딩
function getUser(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status===200){
            var users = JSON.parse(xhr.responseText);
            console.log(users);

            var tbody = document.querySelector('#user-list tbody');
            tbody.innerHTML = '';
            
            users.map(function(user){
                var row = document.createElement('tr');
                row.addEventListener('click', function(){
                    // 사용자 이름을 누르면 해당 사용자가 쓴 댓글 로딩
                    getComment(user._id);
                });
                
                var td = document.createElement('td');
                td.textContent = user._id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.age;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.married ? '기혼':'미혼';
                row.appendChild(td);
                tbody.appendChild(row);
            });
        } else{
            // status가 200이 아닌 경우
            console.error(xhr.responseText);
        }
    }; // onload 끝
}

// 댓글 로딩
// 사용자 아이디에 해당하는 댓글 로딩
function getComment(id){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status===200){
            var comments = JSON.parse(xhr.responseText);
            var tbody = document.querySelector('#comment-list tbody');
            tbody.innerHTML = '';

            comments.map(function(comment){
                var row = document.createElement('tr');
                var td = document.createElement('td');
                td.textContent = comment._id;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = comment.commenter.name;
                row.appendChild(td);
                td = document.createElement('td');
                td.textContent = comment.comment;
                row.appendChild(td);

                var edit = document.createElement('button');
                edit.textContent = '수정';
                edit.addEventListener('click', function(){ // 수정 클릭 시
                    var newComment = prompt('바꿀 내용을 입력하세요');
                    if(!newComment){
                        return alert('내용을 반드시 입력하셔야 합니다');
                    }
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status===200){
                            console.log(xhr.responseText);
                            getComment(id);
                        }else{
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PATCH', '/comments/'+comment._id);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                    xhr.send(JSON.stringify({ comment: newComment }));
                }); // 수정 클릭 끝

                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function(){ // 삭제 클릭 시
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function(){
                        if(xhr.status===200){
                            console.log(xhr.responseText);
                            getComment(id);
                        }else{  
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/comments/'+comment._id);
                    xhr.send();
                }); // 삭제 클릭 끝

                td = document.createElement('td');
                td.appendChild(edit);
                row.appendChild(td);
                td = document.createElement('td');
                td.appendChild(remove);
                row.appendChild(td);
                tbody.appendChild(row);
            }); // comment mapping
        }else{ // getComment()의 첫 번째 xhr.staus !== 200 인 경우
            console.error(xhr.responseText);
        }
    }; // getComment()의 첫 번째 xhr.onload 끝
    xhr.open('GET', '/comments/'+id);
    xhr.send();
}

// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', function(e){
    e.preventDefault();
    var name = e.target.username.value;
    var age = e.target.age.value;
    var married = e.target.married.checked;

    if(!name){ return alert('이름을 입력하세요'); }
    if(!age){ return alert('나이를 입력하세요'); }

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status===201){
            console.log(xhr.responseText);
            getUser(); // 사용자 로딩
        }else{
            console.error(xhr.responseText);
        }
    };

    xhr.open('POST', '/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ name: name, age: age, married: married }));

    e.target.username.value = '';
    e.target.age.value = '';
    e.target.married.checked = false;
});

// 댓글 등록 시 
document.getElementById('comment-form').addEventListener('submit', function(e){
    e.preventDefault();
    var id = e.target.userid.value;
    var comment = e.target.comment.value;
    
    if(!id){ return alert('아이디를 입력하세요'); }
    if(!comment){ return alert('댓글을 입력하세요'); }

    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status===201){
            console.log(xhr.responseText);
            getComment(id); // 댓글 로딩
        }else{
            console.error(xhr.responseText);
        }
    };
    
    xhr.open('POST', '/comments');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id: id, comment: comment }));

    e.target.userid.value = '';
    e.target.comment.value = '';
});