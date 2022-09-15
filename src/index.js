require('dotenv').config();
const express = require('express');
const router = require('./router');

const app = express();
const { PORT } = process.env;

app.use(express.json());
app.use(router);

app.use((err, _req, res, _next) => (
  res.status(500).json(err.message)
));

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
