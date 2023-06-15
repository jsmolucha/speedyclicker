const {appWindow} = window.__TAURI__.window;

const modal = document.querySelector("#modal")
const dialog = document.querySelector("#dialog")
const dialogClose = document.querySelector("#dialog-close")
const playable = document.querySelector(".game-container")
const startOp = document.querySelector("#open-fullscreen-window")
const header = document.querySelector("#header")
const startCountdown = document.querySelector("#start-button")
const starter = document.querySelector("#game-starter-prop")

var running = false

//onload start the modal and make the playable area hidden
window.addEventListener("load", (event) => {
  
  dialog.showModal();
  playable.hidden = true;
  starter.hidden = true;
})

//start the event listener for the start game
startOp.addEventListener('click', (event) => {
  startGame();
})

function generateObj() {

  var object = document.createElement('button')
  object.id = "the-object"
  object.style.top = `${getTopX(upper, bottom)}px`
  object.style.left = `${getLeftY(right, left)}px`
  console.warn(`playable: w=${xBounds}, h=${yBounds}`)
  playable.appendChild(object)
  const start = Date.now()

  function handleClose() {
    const end = Date.now()
    console.log(`clicked on Obj @ x${object.getBoundingClientRect().top} y${object.getBoundingClientRect().left}`)
    playable.replaceChildren()
    closeGame();
    playable.hidden = true;
    header.style.display = "flex"
    console.log(end-start)
    object.removeEventListener('click', handleClose);

  }

  object.addEventListener('click', handleClose);
}



async function gameInit() {
  
  await setTimeout(() => {

    generateObj();
  }, 3000);
}

function startGame() { 
    console.log(`Running?: ${running}`)
    header.style.display = "none"
    starter.hidden = false;
    playable.hidden = false;
    appWindow.setFullscreen(true);

    if (running === true) {
      console.log(`Game was already running: ${running}`)
      appWindow.setFullscreen(true)

    } else {
      startCountdown.addEventListener('click', () => {
        running = true
        starter.hidden = true
        gameInit();
      })
    }
}

function closeGame() {
  appWindow.setFullscreen(false)
}

const upper = Math.floor(playable.getBoundingClientRect().top)
const bottom = Math.floor(playable.getBoundingClientRect().bottom)

const xBounds = bottom - upper

const right = Math.floor(playable.getBoundingClientRect().right)
const left = Math.floor(playable.getBoundingClientRect().left)

const yBounds = right - left

function getTopX(max, min) {
return Math.floor(Math.random() * (max - min +1 )) + min;
}

function getLeftY(max, min) {
return Math.floor(Math.random() * (max - min + 1)) + min;
}

dialogClose.addEventListener('click', (event) => {
  dialog.close();
})
