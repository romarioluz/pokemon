import { db } from '../models/index.js';
const Pokemon = db.pokemon;
const create = async (req, res) => {
  const pokemon =new Pokemon({
    name:req.body.name,
    image:req.body.image,
    hp:req.body.hp,
    attack:req.body.attack,
    defense:req.body.defense,
    speed:req.body.speed,
    active:req.body.active,
  });

  try {

    await pokemon.save(pokemon)
    res.send({message: 'Pokemon salvo com sucesso'})
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    const data = await Pokemon.find(condition)
    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await findById({_id:id})
    if(data.length<1){
      res.status(404).send({message:`Pokemon id:${id} não encontrado`})
    }else{
      res.send(data)
    }

  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Documento id: ' + id });
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const data = await pokemon.findByIdAndUpdate({_id:id}, req.body, {new:true})
    if(data.length<1){
      res.status(404).send({message:`Pokemon id:${id} não encontrado`})
    }else{
      res.send(data)
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar o Pokemon id: ' + id });
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await pokemon.findByIdAndDelete({_id:id})
    if(data.length<1){
      res.status(404).send({message:`Pokemon id:${id} não encontrado para exclusão`})
    }else{
      res.send(data)
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Pokemon id: ' + id });
  }
};

const removeAll = async (req, res) => {

  try {
    const data = await pokemon.deleteMany();
    if(data.length<1){
      res.status(404).send({message:`Não há pokemon para exclusão`})
    }else{
      res.send({message:'pokemons excluídos com sucesso'})
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos os Pokemons' });
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
