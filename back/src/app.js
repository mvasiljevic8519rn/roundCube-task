const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8000;
const commentsRoutes = require('./routes/commentsRoutes.js');

app.use(cors());
app.use(express.json());
app.use('/api', commentsRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});