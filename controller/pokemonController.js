import { db } from '../models/index.js';
import {logger} from '../config/logger.js'

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
    logger.info(`POST /pokemon`)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
      logger.info(`POST /pokemon - ${JSON.stringify(error.message)}`)
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
    logger.info(`POST /pokemon`)
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
      logger.info(`GET /pokemon - ${JSON.stringify(error.message)}`)
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await findById({_id:id})
    if(data.length<1){
      res.status(404).send({message:`Pokemon id:${id} não encontrado`})
      logger.info(`GET /pokemon/:id  ${id}- Pokemon não encontrado`)
    }else{
      res.send(data)
      logger.info(`GET /pokemon/id:`)
    }

  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Documento id: ' + id });
    logger.info(`GET /pokemon -${id} ${JSON.stringify(error.message)}`)
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
    logger.info(`PUT /pokemon`)
    if(data.length<1){
      res.status(404).send({message:`Pokemon id:${id} não encontrado`})
      logger.info(`PUT /pokemon/:id  ${id}- Pokemon não encontrado`)
    }else{
      res.send(data)
      logger.info(`PUT /pokemon/id:`)
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar o Pokemon id: ' + id });
    logger.info(`PUT /pokemon -${id} ${JSON.stringify(error.message)}`)
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await pokemon.findByIdAndDelete({_id:id})
    if(data.length<1){
      res.status(404).send({message:`Pokemon id:${id} não encontrado para exclusão`})
      logger.info(`DELETE /pokemon/:id  ${id}- Pokemon não encontrado`)
    }else{
      res.send(data)
      logger.info(`DELETE /pokemon/id:`)
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Pokemon id: ' + id });
      logger.info(`DELETE /pokemon -${id} ${JSON.stringify(error.message)}`)
  }
};

const removeAll = async (req, res) => {

  try {
    const data = await pokemon.deleteMany();
    if(data.length<1){
      res.status(404).send({message:`Não há pokemon para exclusão`})
      logger.info(`DELETE /pokemon  ${id}- Não há pokemon para exclusão`)
    }else{
      res.send({message:'pokemons excluídos com sucesso'})
      logger.info(`DELETE /pokemon`)
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos os Pokemons' });
    logger.info(`DELETE /pokemon - ${JSON.stringify(error.message)}`)
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
