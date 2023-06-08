
const hi = "hello"
const modal = document.querySelector("#modal")
const dialog = document.querySelector("#dialog")
const dialogClose = document.querySelector("#dialog-close")


window.addEventListener("load", (event) => {
  dialog.showModal();
})

dialogClose.addEventListener('click', (event) => {
  dialog.close()
})


ipcRenderer.send("excel:process", {
    hi
})



ipcRenderer.on("process:done", () => {
    console.warn("done!")

})





