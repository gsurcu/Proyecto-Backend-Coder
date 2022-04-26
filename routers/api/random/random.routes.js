
const randomNumber = (cant = 1e8) => {
  const arr = {}
  for (let i = 0; i < cant; i++) {
    // 1 - 1000
    const num = Math.floor((1000)*(Math.random())+1); 
    if (arr[num] >= 1) {
      arr[num]++;
    } else {
      arr[num] = 1
    }    
  }
  // console.log(arr)
  return arr
}
module.exports = randomNumber;