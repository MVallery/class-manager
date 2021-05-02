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
export const checkActiveClass = (array, obj) => {
    // let newArray
    for (let i in array) {
      if (array[i].title === obj.title) {
        array[i] = obj;
      }
    }
    return array;
};
export const colorPallet = (palletChoice) => {
  // lightBlueGreen = `rgb(${randWhole(150,180)},${randWhole(150,180)}, 255)`
  const colorPalletList = {
    lightBluePurple:`rgb(${randWhole(90,200)},${randWhole(145,155)}, ${randWhole(200,255)})`,
    softPurplePink: shuffleArray(['#FF6979','#FF7C89', '#FF8E99', '#FFA1A9', '#FFB3B9', '#E5B7BE', '#D8B9C0', '#C4A8B2', '#BAA0AB', '#AF97A3'])[0],
    brightRainbow: shuffleArray(['#f065dd','#df1f5f','#a91fdf','#406be2', '#40e27e', '#ddf363','#f87a40'])[0],
    lightBlueGreen: `rgb(${randWhole(1,180)},${randWhole(150,200)}, ${randWhole(150,255)})`,
    darkPurpleBlue: shuffleArray([`rgb(${randWhole(15,20)}, ${randWhole(18,40)}, ${randWhole(90,100)})`, 
                                  `rgb(${randWhole(40,50)}, ${randWhole(10,30)},${randWhole(100,120)})`, 
                                  `rgb(${randWhole(60,80)}, ${randWhole(7,20)}, ${randWhole(100,120)})`])[0],
    green: shuffleArray(['#8cbf60', '#a0e366', '#86e632', '#a4c785', '#c8e3b1', '#7cd479', '#5ceb57'])[0],
    pastelRainbow: shuffleArray(['#f2a68a','#fffcbd','#d9ffbd','#bdffe7','#bdfcff','#bdccff','#efd7fc','#fcd7ea', '#a3d3ff'])[0]
  }
  return colorPalletList[palletChoice]
}