const express = require('express');
const path = require('path');
const app = express();
const logger = require('./middleware/logger')

// init middleware
// app.use(logger);

// body parse middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })
// set static folder
app.use('/api/members', require('./routes/apis/members'))
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started running on port ${PORT}`));
