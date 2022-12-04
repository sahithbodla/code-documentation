import app from './app.js';
import { connectDB } from './config/database.js';

connectDB();

app.listen(process.env.PORT, () =>
  console.log(`Server is working on PORT: ${process.env.PORT}`)
);

// Testing a get call
app.get('/', (req, res, next) => {
  res.send('<h1>Hello World</h1>');
});
