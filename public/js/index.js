// const socket = io.connect()
// const  chatBody = document.querySelector('.chat-body');
// const  message = document.querySelector('#message');


//Welcome Message from chatBot
socket.on("intro_menu", (Msg) => {
  welcomeUser(Msg);
});

//Manages User Inputs
socket.on("customerMsg", (Msg) =>{
  userInput(Msg);
})

//Display Food Menu
// socket.on("showFoodMenu", (Msg) =>{
//   displayMenu(Msg)
// })

//Event Listener  activates when User clicks the "send" button
// send.addEventListener("click", () => {
//   // event.preventDefault();
//   displayCustomersOption();
  
// });

//Event Listener  activates when User clicks the keyboard's "ENTER" button
message.addEventListener('keydown',(e) =>{
      // e.preventDefault()

      if(e.keyCode === 13){
          displayCustomersOption()
       }
  })
  
//Socket sends User's selected option to the backend
socket.on("comfirmedOrder", (Msg) =>{
  placeOrder(Msg)
});

