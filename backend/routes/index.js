const express = require('express');
const router = express.Router();
const app = express();
const accountRounter = require('./account');
const userRouter = require('./user');

app.use('/accounts',accountRounter);
app.use('/user',userRouter);

router.get('/', (req, res) => {

});




module.exports = router;