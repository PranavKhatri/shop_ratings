const http = require('http');

const app = require('./app');

const { mongoConnect } = require('./src/utils/mongo')

require('dotenv').config();

const PORT = process.env.PORT; 

const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    
    server.listen(PORT, ()=>{
        console.log(`Listening on PORT ${PORT}.....`);
    })
}

startServer();