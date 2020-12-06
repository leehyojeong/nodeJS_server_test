// spread syntax trick 1
// rest parameter

const sum = (acc, ...nums) => {
    for(let num of nums){
        acc += num
    }
    return acc
}

console.log(sum(0,10,20,30))