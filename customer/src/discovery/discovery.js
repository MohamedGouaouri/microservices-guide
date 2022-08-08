const consul = require("consul");
const CONSUL_ID = require("uuid").v4();


const config = {
    name: "customer",
    address: process.env.HOST,
    port: process.env.PORT,
    id: CONSUL_ID,
    check: {
        ttl: '10s',
        deregister_critical_service_after: '1m'
    }
}

const consulClient = consul()


const consulClientBootstrap = () => {
    consulClient.agent.service.register(config, err => {
        if (err) throw new Error(err);

        // schedule heartbeating
        setInterval(() => {
            consulClient.agent.check.pass({
                id: `service:${CONSUL_ID}`
            }, err => {
                if (err) throw new Error(err);
            })

            console.log('told Consul that we are healthy');
        }, 5 * 1000)


        process.on("SIGINT", () => {
            console.log("De-Registering... ")
            consulClient.agent.service.deregister({
                id: CONSUL_ID
            }, err => {
                console.log('de-registered.', err);
                process.exit();
            })
        })
    })
}


module.exports = {
    consulClientBootstrap
}