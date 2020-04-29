const express = require("express");
const app = express();
const port = 3000
app.get('/', (req, res) => {
    return res.send('Home');
});

app.get('/login', (req, res) => { 
    return res.send('You are logged in');
});

app.get('/logout', (req, res) => res.send('You are logged out'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))