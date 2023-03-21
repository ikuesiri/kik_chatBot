const socket = io();
const chatForm = document.getElementById("chat-form");
const chatBody = document.querySelector(".chat-body");

socket.on("bot message", (message) => {
	renderChat("kik_bot", message);
});

socket.on("user message", (message) => {
	renderChat("You", message);
	setFocusPosition();
});

chatForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let msg = e.target.elements.msg.value;
	if (!msg) {
		return false;
	}

	socket.emit("Customers message", msg);

	// Clear input
	e.target.elements.msg.value = "";
	e.target.elements.msg.focus();
});

// Output message to DOM
const renderChat = (type, message) => {
	// //check if message.text is an array
	if (Array.isArray(message.text)) {
		let msg = message.text.map((item) => `${item.number}: To ${item.text}`).join('<br>');
		msg = `Please select a number from the list below: <br>  ${msg};`
				
			message.text = msg;
		} else {
			message.text = message.text;
		}

	let className = "user-response"
	if (type === "kik_bot") {
		className = "chatBot-response";
	} 
	const displayMsg= document.querySelector(".chat-body");
	const messageTag = document.createElement("div");
	messageTag.classList.add(className);
	messageTag.innerHTML = `
  <p >${message.username} <span>${message.time}</span></p>
  <hr><br>
  <p>${message.text}</p><br>`;
  
	displayMsg.appendChild(messageTag);
	setFocusPosition();
};


//Auto Scrolls the chat view to the last Message
const  setFocusPosition =() =>{
	if(chatBody.scrollHeight > 0){
		chatBody.scrollTop = chatBody.scrollHeight
	}
 }