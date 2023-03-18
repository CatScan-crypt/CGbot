import express from 'express';
import path from 'path';


const app = express();

// Serve static files in 'public' folder
app.use(express.static('public'));

app.get('/app.html', (req, res) => {
  res.send('htmlpage');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}/app.html`);
});
