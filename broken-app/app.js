const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

app.post('/', async function(req, res, next) {
  try {
    const developers = req.body.developers;
    const results = await Promise.all(developers.map(async d => {
      const response = await axios.get(`https://api.github.com/users/${d}`);
      return response.data;
    }));

    const out = results.map(r => ({ name: r.name, bio: r.bio }));

    res.send(JSON.stringify(out));

    // Print output to console
    console.log(out);
  } catch (err) {
    next(err); // Pass error to the error handling middleware
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
