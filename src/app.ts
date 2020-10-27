import express from 'express';

const app = express();
const port = 3000;

app.use(express.static('./public'));
app.use(express.static('./dist'));
app.get('/', (req, res) => {
  res.sendFile('/index.html', { root: './public/' });
});
app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
