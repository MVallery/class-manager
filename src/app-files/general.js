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
    softPurplePink: ['#FF6979','#FF7C89', '#FF8E99', '#FFA1A9', '#FFB3B9', '#E5B7BE', '#D8B9C0', '#C4A8B2', '#BAA0AB', '#AF97A3'],
    brightRainbow: ['#f065dd','#df1f5f','#a91fdf','#406be2', '#40e27e', '#ddf363','#f87a40'],
    lightBlueGreen: `rgb(${randWhole(1,180)},${randWhole(150,200)}, ${randWhole(150,255)})`
  }
  return colorPalletList[palletChoice]
}