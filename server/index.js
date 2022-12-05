const express = require('express')
const morgan = require('morgan')

var server = express();
server.use(morgan('tiny'))


server.get('/@:id', (req, res) => {
    console.log('hello, ', req.params.id);
    res.status(200);
    res.json({status : "success"}).send;
})

server.get('/users', (req, res) => {
    let reqjson = req.body;

    

})

server.listen(3000, () => {
    console.log("Server running on port 3000");
});