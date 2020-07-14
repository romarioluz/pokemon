import mongoose from 'mongoose';
import pokemonModel from './pokemonModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.pokemon = pokemonModel(mongoose);
export { db };
