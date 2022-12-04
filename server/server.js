import app from './app.js';

app.listen(process.env.PORT, () =>
  console.log(`Server is working on PORT: ${process.env.PORT}`)
);
