import express from 'express';
import {cadastrarTreinamento, listarTreinamentos, atualizarTreinamento, deletarTreinamento, buscarTreinamentoPorId} from '../controller/treinamentoController.js';


const router = express.Router();

router.post('/', cadastrarTreinamento);
router.get('/', listarTreinamentos);
router.get('/:id', buscarTreinamentoPorId);
router.patch('/:id', atualizarTreinamento);
router.delete('/:id', deletarTreinamento);

export default router;
