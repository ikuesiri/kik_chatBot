

// const socket = io.connect('http://localhost:5001')

send.addEventListener("click", () =>{
    console.log("i was clicked!")
})

socket.on("intro_menu", (Msg) => {
  welcomeUser(Msg);
});
