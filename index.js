// code away!
const express = require('express')

const server = express();

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

function logger(req, res, next) {
     req.requestTime = new Date().toString();
    console.log(
      `\nrequest method: ${req.method} \nrequest url: ${req.path} \ntimestamp: ${req.requestTime}`
    );

    next();
}

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`server is working`);
});

server.use('/api/user', userRouter);
server.use('/api/post', postRouter);

server.listen(4444, () => {
  console.log("\n*** Server Running on http://localhost:4444 ***\n");
});