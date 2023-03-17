const moment = require("moment");

const chatFormat = (name , msg) => {
    return {
        name,
        msg,
        time: moment.defaultFormat.at("h:mm a")
    }
}

 module.export =  chatFormat;