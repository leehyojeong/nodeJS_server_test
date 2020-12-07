// 비구조화 할당
// 비구조화 할당
var array = ['node', {}, 10, true]
var node = array[0]
var obj = array[1]
var bool = array[3]

// 다음과 같이 바꿀 수 있음
const array2 = ['node', {}, 10, true]
const [node, obj, , bool] = array2