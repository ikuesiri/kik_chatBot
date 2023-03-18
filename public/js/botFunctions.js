const socket = io.connect()
const  chatBody = document.querySelector('.chat-body');
const  message = document.querySelector('#message');
const  send = document.querySelector('.send-btn');

//Auto Scrolls the chat view to the last Message
const  setFocusPosition =() =>{
   if(chatBody.scrollHeight > 0){
       chatBody.scrollTop = chatBody.scrollHeight
   }
}

//renders Message
function renderChat(Msg, type){
   let className = "user-response"
     if( type === "kik_bot"){
        className = "chatBot-response"
     }
    const displayMsg = document.querySelector('.chat-body');
    const messageTag = document.createElement('div');
    messageTag.classList.add(className)
    messageTag.innerHTML =  `
       <div>
          <p > ${Msg.user} <span>${Msg.time}</span></p>
          <p>${Msg.msg}</p>
       </div>`;
    displayMsg.appendChild(messageTag);
    setFocusPosition();
}


const renderFoodMenu = (Msg, type) => {
   let className = "user-response"
     if( type === "kik_bot"){
        className = "chatBot-response"
     }
    const displayMsg = document.querySelector('.chat-body');
    const messageTag = document.createElement('div');
   let foodMenu = [];
   Msg.forEach((item) =>
     foodMenu.push(
       `Select ${item.foodId} for ${item.name} --  ₦${item.price}`
     )
   );
   const menuList = foodMenu.map((items) => `<br>${items}`).join("");
 
   messageTag.innerHTML =  `
    <div>
      <p> ${Msg.user} <span>${Msg.time}</span></p>
      <h4>Place your order:</h4>
      <hr><br>
      <p>${menuList}</p>
      <p>Select 00 to go back to the home menu</p>
    </div>`;
      displayMsg.appendChild(messageTag);
      setFocusPosition();
}



// function to display Customer's placed Order(s)
function renderPlacedOrder(Msg, type){
   let className = "user-response"
     if( type === "kik_bot"){
        className = "chatBot-response"
     }
    const displayMsg = document.querySelector('.chat-body');
    const messageTag = document.createElement('div');
    messageTag.classList.add(className)
    messageTag.innerHTML =  `
       <div>
       <p > ${Msg.user} <span>${Msg.time}</span></p>
       <h4> Your Order(s):</h4>
       <hr><br>
       <ul>
         <li>Ordered: ${Msg.msg.orderedItem}</li>
         <li>Price: ${Msg.msg.price}</li>
         <li>time: ${Msg.msg.createdAT}</li>
      </ul>
      <ul>
         <li><b>Select 99</b> to Checkout order</li>
         <li>Select 1 to place a new order</li>
         <li>Select 00 to go the main menu</li>
      </ul>
       press 99 to checkout order
       Press 1 to make a new order 
       Press 10 to go back to the main menu
        </div>`;
    displayMsg.appendChild(messageTag);
    setFocusPosition();
}



//-----------------------------------------------

// Welcome Message
function welcomeUser(Msg) {
    renderChat(Msg, 'kik_bot');
  }

//   User reponse
function userInput(Msg) {
   renderChat(Msg);
}

let isDisplayed = false;
//Users Options
 const displayCustomersOption = ()=> {
    const Msg = message.value;
    socket.emit("customerMsg", Msg);
 
   switch (Msg) {
     case "1":
       socket.emit("foodMenu", "1");
       isDisplayed = true;

       break;
     case "99":
       socket.emit("checkoutOrder", Msg);
       break;
       case "98":
          socket.emit("orderHistory", Msg);
       break;
       case "97":
            socket.emit("currentOrder");
            
       break;
     case "0":
       socket.emit("cancelOrder");
       console.log("0")
       break;
       case "10":
          socket.emit("mainMenu");
          console.log("10")
       break;
       default:
          if (isDisplayed && Msg >= "10" && Msg <= "16") {
             socket.emit("placeOrder", Msg);
             isDisplayed = false;
            } else {
               socket.emit("errMessage", Msg);
               console.log("Sorry, You seem to have made an Invalid Input, Please try again!")
            }
         }
         message.value = "";
         setFocusPosition()        
}





function displayMenu(Msg) {
   renderFoodMenu(Msg, 'kik_bot');
   
 }



function placeOrder(Msg) {
   renderPlacedOrder(Msg, 'kik_bot')
 }






//reFactor POINT

 
 function orderHistory(Msg) {
   const messageList = document.querySelector("#message-list");
 
   Msg.msg.forEach((checkout) => {
     const newMessageListItem = document.createElement("div");
     const menu = [];
     let total = 0;
 
     checkout.forEach((item) => {
       menu.push(item.id + "  " + item.name + ": " + " ₦" + item.price);
       total += parseFloat(item.price);
     });
 
     const menuItems = menu.map((menuItem) => `<br>${menuItem}`).join("");
 
     newMessageListItem.innerHTML = `
       <div class="chat-message chatbot">
       <div class="message">
         <p class="meta">${Msg.user} <span>${Msg.time}</span></p>
         <p>Order history</p>
         <p class="text">
           ${menuItems}</br>
           Total: ₦${total}
         </p>
         <p>Press 10 to go back to the main menu</p>
       </div>
       </div>`;
 
     messageList.appendChild(newMessageListItem);
   });
 
   chatScreen.scrollTop = chatScreen.scrollHeight;
 }
 
 function customerMessage(Msg) {
   const messageList = document.querySelector("#message-list");
   const newMessageListItem = document.createElement("div");
 
   newMessageListItem.innerHTML = `
     <div class="chat-message customer">
      <div class="message">
       <p class="meta">${Msg.user} <span>${Msg.time}</span></p>
       <p>${Msg.msg}</p>
      
     </div>
     </div>`;
 
   messageList.appendChild(newMessageListItem);
   chatScreen.scrollTop = chatScreen.scrollHeight;
 }
 
 function currentOrder(Msg) {
   const messageList = document.querySelector("#message-list");
   const newMessageListItem = document.createElement("div");
 
   const currentOrders = [];
 
   Msg.msg.forEach((order) => {
     currentOrders.push(`
     food: ${order.name}<br>
     price: ₦${order.price}<br>
     ordered on: ${order.orderDate}<br>
   `);
   });
 
   const currentOrder = currentOrders.join("<br>");
 
   newMessageListItem.innerHTML = `
      <div class="chat-message chatbot">
       <div class="message">
         <p class="meta">${Msg.user} <span>${Msg.time}</span></p>
         <p>Current Order</p>
         <p class="text">
           ${currentOrder}</br>
                 </p>
       press 99 to checkout order </br>
       Press 10 to go back to the main menu </br>
       </div>
       </div>`;
 
   messageList.appendChild(newMessageListItem);
 
   chatScreen.scrollTop = chatScreen.scrollHeight;
 }
 
 function simpleMessage(Msg) {
   const messageList = document.querySelector("#message-list");
   const newMessageListItem = document.createElement("div");
 
   newMessageListItem.innerHTML = `
     <div class="chat-message chatbot">
      <div class="message">
       <p class="meta">${Msg.user} <span>${Msg.time}</span></p>
       <p>${Msg.msg}</p>
       <p>Press 10 to go back to the main menu</p>
     </div>
     </div>`;
 
   messageList.appendChild(newMessageListItem);
   chatScreen.scrollTop = chatScreen.scrollHeight;
 }
 