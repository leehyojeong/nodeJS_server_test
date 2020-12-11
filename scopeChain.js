// 전역 범위 (global scope)
var e = 10;
function sum(a) {
    return function(b) {
        return function(c) {
            // 외부 함수 범위 (outer functions scope)
            return function(d) {
                // 지역 범위 (local scope)
                return a+b+c+d+e;
            }
        }
    }
}

console.log(sum(1)(2)(3)(4)); // 20