const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const numbersMap = {};

app.post('/numbers/:numberId', (req, res) => {
  const numberId = req.params.numberId;
  const number = req.body.number;

  if (!Number.isNaN(parseFloat(number)) && Number.isFinite(number)) {
    if (!numbersMap[numberId]) {
      numbersMap[numberId] = [];
    }
    numbersMap[numberId].push(parseFloat(number));
    res.status(200).send(`Number ${number} added to ${numberId}`);
  } else {
    res.status(400).send('Invalid number format');
  }
});

app.get('/numbers/:numberId', (req, res) => {
  const numberId = req.params.numberId;

  if (!numbersMap[numberId] || numbersMap[numberId].length === 0) {
    res.status(404).send('No numbers found for this ID');
  } else {
    const numbers = numbersMap[numberId];
    const average = numbers.reduce((acc, curr) => acc + curr, 0) / numbers.length;
    res.status(200).json({ average });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
