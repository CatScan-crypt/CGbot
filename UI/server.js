const express = require('express');
const path = require('path');

const app = express();

// Serve static files in 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/app.html', (req, res) => {
  res.send('htmlpage');
});

// Set the MIME type for JavaScript files
app.get('*.js', (req, res, next) => {
  res.setHeader('Content-Type', 'application/javascript');
  next();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
