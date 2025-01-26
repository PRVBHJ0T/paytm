const express = require('express');
const router = express.Router();
const app = express();
const userRouter = require('./user');


app.use('/user',userRouter);

router.get('/', (req, res) => {

});




module.exports = router;