import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
export const client = new MongoClient(url);
