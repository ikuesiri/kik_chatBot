const socket = io.connect()
const  chatBody = document.querySelector('.chat-body');
const  message = document.querySelector('#message');
const  send = document.querySelector('.send-btn');



//renders Message
function renderChat(Msg){
    const displayMsg = document.querySelector('.chat-body');
    const messageTag = document.createElement('div');
    messageTag.classList.add("chatBot-response")
    messageTag.innerHTML =  `
       <div>
        <div class="message">
          <p > ${Msg.user} <span>${Msg.time}</span></p>
          <p class="text">
             ${Msg.msg}
          </p>
        </div>
     </div>`;
    displayMsg.appendChild(messageTag)
}

function welcomeUser(Msg) {
    renderChat(Msg);
    // chatBody.appendChild(messageTag)
  }