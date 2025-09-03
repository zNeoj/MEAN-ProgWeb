// db.js
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/MEAN', { 
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

export default mongoose;
