// code away!
const express = require('express')

const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`server is working`);
});

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.listen(4444, () => {
  console.log("\n*** Server Running on http://localhost:4444 ***\n");
});