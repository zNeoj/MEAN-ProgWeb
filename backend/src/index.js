import express from 'express';
import cors from 'cors';

import crud from './routes/CRUD.js';




// dotenv.config({ path: './dev.env'})

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const app = express();

app.use(cors({
  origin: [
    'http://localhost:4200',
    'http://192.168.0.171:4200'   // add protocol
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('🚀 Express is alive!');
});

// Routes declaration. 
// No need to add anything else here. Go to src/routes/index.js to add your routes.
app.use('/crud', crud);

app.listen(PORT, HOST, async () => {
    
  console.log(`🚀 Server running at http://${HOST}:${PORT}`);
});