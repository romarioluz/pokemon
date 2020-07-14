
export default (mongoose) =>{
const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  hp: {
    type: Number,
    required: true,
    min: 0,
  },
  attack: {
    type: Number,
    required: true,
    min: 0,
  },
  defense: {
    type: Number,
    required: true,
    min: 0,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
  },
  active: {
    type: Boolean,
  },
});
const Pokemon = mongoose.model('pokemon', schema, 'pokemon')
return Pokemon
}