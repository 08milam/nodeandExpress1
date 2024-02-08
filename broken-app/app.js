const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/', async function(req, res, next) {
  try {
    const developers = req.body.developers;
    const results = await Promise.all(developers.map(async d => {
      const response = await axios.get(`https://api.github.com/users/${d}`);
      return response.data; // Extract 'data' from axios response
    }));

    const out = results.map(r => ({ name: r.name, bio: r.bio }));

    return res.json(out);
  } catch(err) {
    next(err);
  }
});

// Define a route handler for the root path
app.get('/', async function(req, res, next) {
  try {
    // Fetch developers' data
    const developers = ['joelburton', 'elie'];
    const results = await Promise.all(developers.map(async d => {
      const response = await axios.get(`https://api.github.com/users/${d}`);
      return response.data;
    }));

    // Extract name and bio from each developer's data
    const developersInfo = results.map(r => ({ name: r.name, bio: r.bio }));

    // Format the response
    let responseText = 'Developers:\n';
    developersInfo.forEach(developer => {
      responseText += `Name: ${developer.name}\nBio: ${developer.bio}\n\n`;
    });

    // Send the response
    res.send(responseText);
  } catch(err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
