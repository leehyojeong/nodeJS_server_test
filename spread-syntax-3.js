// spread syntax trick 3
// immutable data pattern

var favoriteThing = {
    type: 'Animal',
    name: 'Cat'
}

var person = {
    name: 'Tom',
    favorite: favoriteThing
}

// 사람만 복제되어 두 개의 객체가 되었을 뿐 좋아하는 것은 하나를 서로 참조
var otherPerson = {...person}

console.log(person.favorite === otherPerson.favorite)