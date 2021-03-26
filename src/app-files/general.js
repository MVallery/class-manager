export const randWhole = (x, y) => {
    // return Math.floor(Math.random()*y +x)
    var num =  Math.floor(Math.random() * (y - x + 1) + x)
  
    return num
  
  }

export function cap(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return (array)
  }