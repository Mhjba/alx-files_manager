import express from 'express';
import router from './routes/index.js'; // تأكد من إضافة .js إلى نهاية المسار

const port = parseInt(process.env.PORT, 10) || 5000;

const app = express();

app.use(express.json());
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;

