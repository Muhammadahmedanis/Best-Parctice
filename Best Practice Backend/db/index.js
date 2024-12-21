import mongoose from 'mongoose';
import 'dotenv/config';

const url = `mongodb+srv:${ process.env.DB_NAME }:${ process.env.DB_PASSWORD }@cluster0.tvtr7.mongodb.net/${ process.env.DB_NAME }`;

mongoose.connect(url);

export default mongoose;