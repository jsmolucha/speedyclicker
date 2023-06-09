
const hi = "hello"
const modal = document.querySelector("#modal")
const dialog = document.querySelector("#dialog")
const dialogClose = document.querySelector("#dialog-close")
const insert = document.querySelector("#tester")
const playable = document.querySelector(".game-container")
const spawn = document.querySelector("#test-spawn")
const startOp = document.querySelector("#close-external-window")
const exitFs = document.querySelector("#exit-fs")
const header = document.querySelector("#header")

const upper = Math.floor(playable.getBoundingClientRect().top)
const bottom = Math.floor(playable.getBoundingClientRect().bottom)

const xBounds = bottom - upper

const right = Math.floor(playable.getBoundingClientRect().right)
const left = Math.floor(playable.getBoundingClientRect().left)

const yBounds = right - left

var iter = 0

window.addEventListener("load", (event) => {
  dialog.showModal();
  playable.hidden = true;

})

/* spawn.addEventListener('click', (event) => {
  var object = document.createElement('button')
  object.id = "the-object"
  object.style.top = `${getTopX(upper, bottom)}px`
  object.style.left = `${getLeftY(right, left)}px`
  playable.appendChild(object)
  object.addEventListener('click', (event) => {
    console.warn(`clicked obj ${iter++}`)
    console.log(`removed @ x${object.getBoundingClientRect().top} y${object.getBoundingClientRect().left}`)
    object.remove();
    
  })
})
 */


startOp.addEventListener('click', (event) => {
      
      startGame();

})

function generateObj() {
  var object = document.createElement('button')
  object.id = "the-object"
  object.style.top = `${getTopX(upper, bottom)}px`
  object.style.left = `${getLeftY(right, left)}px`
  playable.appendChild(object)
  object.addEventListener('click', (event) => {
    closeGame();
    object.remove();
    playable.hidden = true;
    header.style.display = "flex"
  })
}

async function startGame() { 
  let promise = new Promise((resolve) => {
    ipcRenderer.send('timer3s')
  
    console.log("done ")
    
    resolve(true)
  })

  await promise

}

ipcRenderer.on("timer:done", () => {
  header.style.display = "none"
  playable.hidden = false;
  ipcRenderer.send("goFullScreen")
  console.log(`playable: w=${xBounds}, h=${yBounds}`)
  generateObj();
  
})


function closeGame() {
  ipcRenderer.send("exitFullScreen")
}

ipcRenderer.on("exitFs:done", () => 
  console.log("exited full screen ")
);
  
function getTopX(max, min) {
  return Math.floor(Math.random() * (max - min +1 )) + min;
}

function getLeftY(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

dialogClose.addEventListener('click', (event) => {
  dialog.close();
})







