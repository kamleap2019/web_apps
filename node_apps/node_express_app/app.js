var expressPack = require('express');
const app = expressPack();
const port = 3000;

app.get('/', (req, res) => res.send('Humans Explore!'))

app.listen(port, () => console.log ('Server running on localhost at port ${port}!'))
