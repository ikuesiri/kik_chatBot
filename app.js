const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
// initializing app
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors : {origin : "*" }}); // origin : '*' - enables all connections
//environmental variable configuration file
const CONFIG = require("./utils/config")
//dataBase connection
const connectDB = require('./utils/dbConfig') 
//import routes
const orderRoute = require("./routes/menuRoute");
const chatRoute = require("./routes/chatRoute")
//import session middleware
const session_MW = require("./utils/middleware/sessionMW");
const sharedsession = require("express-socket.io-session");
//bot response functions and handler
const chatFormat = require("./utils/botResponses/chatFormat")
const {mainMenu, getFoodMenu, createOrder, findOrder}= require("./utils/botResponses/botMessages")

// parse application/json
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// set up  session middleware
app.use(session_MW);

//used to display static HTML files
app.use(express.static("public"))
// set up routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/chatBot.html"));
});

//routes 
app.use("/", chatRoute);
app.use("/food-menu", orderRoute);


io.use(
  sharedsession(session_MW, {
    autoSave: true
  })
);

 //Adding  as socket connection/event listener to handle User Input form the frontend using "socket.io" library
 io.on("connection", (socket) =>{
    console.log(`Customer connected: ${socket.id}`)
    const  sessionId = socket.handshake.session.id;
    let msg =''
    //welcome user and display main menu
    socket.emit("intro_menu", mainMenu());
    
    //Structures and returns users inputs back to the frontend
    socket.on("customerMsg", (Msg) =>{
      socket.emit("customerMsg", chatFormat("user", Msg));
    })

    // event to display food types sold in the restaurant
    socket.on("foodMenu", async() => {
      const foodMenu = await getFoodMenu();
      socket.emit("showFoodMenu" , chatFormat("kik_bot", foodMenu) )
    });


    // socket.on("placeOrder", async (textNum) => {
    //       //convert numerical string of the menu to a Number dataType
    //   // const  foodId = parseFloat(Msg);
    //   const  foodId = textNum;
    //   const newOrder = await createOrder(sessionId, foodId);
  
    //   const createdOrder = await findOrder(sessionId, newOrder.orderedItem
    //   );
  
    //   const Msg = {
    //     orderedItem: createdOrder.name,
    //     orderedPrice: createdOrder.price,
    //     createAT: newOrder.createdAT,
    //   };

    //     socket.emit("comfirmedOrder", chatFormat("kik_bot", Msg));;
    // });
    
    // socket.on("errMessage", async() => {
    //    Msg = "Sorry, You seem to have made an Invalid Input, Please try again!"
    //    socket.emit(" ", chatFormat("kik_bot", msg));
    // })
     // Handling disconnection
    socket.on('disconnect', () => {
        console.log(`Customer disconnected: ${socket.id}`);
      });
    });


//setting up the Database and server connections
const start = async() =>{
  try{
      await connectDB(CONFIG.MONGO_DB_URI)
      console.log('database connected')
      server.listen( CONFIG.PORT, () => {console.log(`Server listening at port:${CONFIG.PORT}`) })

    }catch (error) {
      console.log('Unable to connect to the Database ' + error)
 }
}

//starts the connections
start();