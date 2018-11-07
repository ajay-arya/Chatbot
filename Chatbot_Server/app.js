const express = require('express');

var Chat = express();

Chat.get('/', (req, res) => {
    res.send('Hello Express!');
});

Chat.listen(3000);
