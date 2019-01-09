import { SingleProcessHost } from "./hosting";

const DEFAULT_APP_PORT = 9090;

class MainClass {
    static async main() {
        try {
            
            let portNumber = process.env.APP_PORT || DEFAULT_APP_PORT;
            let host = new SingleProcessHost(portNumber);
            //console.log(DEFAULT_APP_PORT);
            await host.startServer();

            console.log(`Server Started Successfully ... PORT ${portNumber}`);

            let stopServer = async () => {
                await host.stopServer();

                console.log('Server Stopped Successfully!');
            };

            process.on('exit', stopServer);
            process.on('SIGINT', stopServer);
        } catch (error) {
            console.error(`Error Occurred, Details : ${JSON.stringify(error)}`);
        }
    }
}

MainClass.main();
