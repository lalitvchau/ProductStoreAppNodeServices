import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import sio from 'socket.io';
import { ProductRouting } from '../routing';

const INVALID_PORT = 'Invalid Listener Port Specified!';
const PRODUCT_SERVICE_URL = '/api/products';
const WEB_CONTENTS = 'web-content';

class SingleProcessHost {
    constructor(portNumber) {
        if (!portNumber) {
            throw new Error(INVALID_PORT);
        }

        this.portNumber = portNumber;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.socketIOServer = sio.listen(this.httpServer);
        //console.log(this.socketIOServer); 
        try {
            this.productRouting = new ProductRouting(this.socketIOServer);
        }
        catch (error) {
            console.log(error);
        }
        console.log(this.productRoputing);

        this.initializeApplication();
    }

    initializeApplication() {
        this.app.use(bodyParser.json());
        this.app.use(PRODUCT_SERVICE_URL, this.productRouting.Router);
        this.app.use(express.static(WEB_CONTENTS));
    }

    startServer() {
        let promise = new Promise(
            (resolve, reject) => {
                this.httpServer.listen(this.portNumber, () => {
                    resolve();
                });
            });

        return promise;
    }

    stopServer() {
        let promise = new Promise(
            (resolve, reject) => {
                this.httpServer.close(() => {
                    resolve();
                });
            });

        return promise;
    }
}

export {
    SingleProcessHost
};