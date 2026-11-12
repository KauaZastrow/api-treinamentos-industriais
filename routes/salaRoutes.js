import express from 'express';
import {cadastrarSala, listarSalas, atualizarSala, deletarSala, buscarSalaPorId} from '../controller/salaController.js';


const router = express.Router();

router.post('/', cadastrarSala);
router.get('/', listarSalas);
router.get('/:id', buscarSalaPorId);
router.patch('/:id', atualizarSala);
router.delete('/:id', deletarSala);

export default router;
