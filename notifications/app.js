const sub = require("./queue/sub");


sub.connect()
    .then(async channel => {
        await sub.consume(channel, "notifications")
    })
    .catch(e => {
        console.error(e)
    })