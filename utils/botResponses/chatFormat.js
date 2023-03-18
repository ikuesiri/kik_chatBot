const moment = require("moment");

//format Chat
const chatFormat = (user, text) => {
    return {
        user,
        text,
        time: moment.defaultFormat.at("h:mm a")
    }
  };

//   moment.defaultFormat.at("d:h:mm a")
    
 module.exports =  chatFormat;