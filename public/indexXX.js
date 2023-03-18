const  chatBody = document.querySelector('.chat-body');
const  message = document.querySelector('#message');
const  send = document.querySelector('.send-btn');


const socket = io.connect('http://localhost:5001')



//=================//

//Adding Event listener to the send button and the keyboard 'ENTER' button to send message to the ..
// backend chatbot ;using socket.io.

//event for clicking the send button
// send.addEventListener("click", (e)=> {
//     e.preventDefault();
//     displayCustomersOption();

//     if (e.target.type === "checkbox") {
//         console.log("Checkbox clicked");
//         const checkbox = e.target;
//             const isChecked = checkbox.checked;
//             const value = checkbox.value;
        
//     }

// })

// message.addEventListener('keydown',(e) =>{
//     // e.preventDefault()
//     if(e.keyCode === 13){
//         displayCustomersOption() 
//     }
//     //     if (e.target.type === "checkbox") {
//     //         console.log("Checkbox clicked");
//     //         const checkbox = e.target;
//     //         const isChecked = checkbox.checked;
//     //         const value = checkbox.value;
        
//     //         console.log(`Checkbox with value ${value} is ${isChecked ? "checked" : "unchecked"}`);
//     // }
// })

// const displayCustomersOption = () =>{
//     const userInput = message.value;

//     if(userInput != ""){
//         renderValue(`user: ${userInput}`, "user")
//         socket.emit('userInput', userInput)
//         message.value = "";
//     }
//     setTimeout(() => {
//         botResponse;
//         setFocusPosition();
//     }, 600);   
// }


// const botResponse = socket.on('message', (data) => {
//         const message = `${data.sender === 'kiki_bot' ? 'Bot' : 'user'}: ${data.message}`;
//         renderValue(message);
//       })


//   //This function structures the user message to be displayed on the chatBody, 
// const renderValue = (text, type) =>{
//      let className = "user-response"
//      if( type !== "user"){
//         className = "chatBot-response"
// }
//     const messageTag = document.createElement('div');
//     messageTag.classList.add(className)
//     // const textNode = document.createTextNode(text)
//     messageTag.innerHTML = text
//     // messageTag.append(textNode)
//     chatBody.append(messageTag)
// }


const  setFocusPosition =() =>{
    if(chatBody.scrollHeight > 0){
        chatBody.scrollTop = chatBody.scrollHeight
    }
}