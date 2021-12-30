# Splitwise-Clone
Splitwise is a bill spliting application https://secure.splitwise.com. I tried to clone the Splitiwse Application for CMPE-273 Lab-2

## How to use

```
Use npm install to install all the dependencies. (In Terminal)
1. cd/Frontend
   npm install
   
2. cd/Backend
   npm install

3. cd/kafka-backend
   npm install

Run the local zookeper and kafka terminals and create the topics mentioned in "kafka-backend/kafka/topics.js" in new local kafka terminal.
   
Use node command to start server side server
4. cd/Backend
   node index.js
   
Use node command to start kafka-backend side server
5. cd/kafka-backend
   node server.js

Use npm start to start the client side sever . (Use another Terminal)
6. cd/Frontend
   npm start
   
```

And point your browser to `http://localhost:3000`.
