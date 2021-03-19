export const randWhole = (x, y) => {
    // return Math.floor(Math.random()*y +x)
    var num =  Math.floor(Math.random() * (y - x + 1) + x)
  
    return num
  
  }

export function cap(string) {
    return string[0].toUpperCase() + string.slice(1);
  }