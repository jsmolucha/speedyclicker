
const hi = "hello"
const modal = document.querySelector("#modal")
const dialog = document.querySelector("#dialog")
const dialogClose = document.querySelector("#dialog-close")
const insert = document.querySelector("#tester")
const playable = document.querySelector(".game-container")
const spawn = document.querySelector("#test-spawn")


const upper = Math.floor(playable.getBoundingClientRect().top)
const bottom = Math.floor(playable.getBoundingClientRect().bottom)

const xBounds = bottom - upper

const right = Math.floor(playable.getBoundingClientRect().right)
const left =Math.floor(playable.getBoundingClientRect().left)

const yBounds = right - left

var iter = 0

window.addEventListener("load", (event) => {
  dialog.showModal();
  console.log(`playable: w=${xBounds}, h=${yBounds}`)

})

spawn.addEventListener('click', (event) => {
  var object = document.createElement('button')
  object.id = "the-object"
  object.style.top = `${getTopX(upper, bottom)}px`
  object.style.left = `${getLeftY(right, left)}px`
  playable.appendChild(object)
  object.addEventListener('click', (event) => {
    console.warn(`clicked obj ${iter++}`)
    console.log(`removed @ x${object.getBoundingClientRect().top} y${object.getBoundingClientRect().left}`)
    object.remove();

    ipcRenderer.send("create:gameWindow", {
    
    })
    
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const closeBtn = document.querySelector("#close-external-window")

  closeBtn.addEventListener('click', (event) => {
    ipcRenderer.send("closeNewWindow")
  })

})
  
function getTopX(max, min) {
  return Math.floor(Math.random() * (max - min +1 )) + min;
}

function getLeftY(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

dialogClose.addEventListener('click', (event) => {
  dialog.close();
})

ipcRenderer.on("process:done", () => {
    console.warn("done!")

})





