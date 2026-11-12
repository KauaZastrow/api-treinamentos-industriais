import express from 'express';
import {cadastrarInstrutor, listarInstrutores, atualizarInstrutor, deletarInstrutor, buscarInstrutorPorId, buscarInstrutorPorNome} from '../controller/instrutorController.js';


const router = express.Router();

router.post('/', cadastrarInstrutor);
router.get('/', listarInstrutores);
router.get('/:id', buscarInstrutorPorId);
router.patch('/:id', atualizarInstrutor);
router.delete('/:id', deletarInstrutor);
router.get('/nome/:nome', buscarInstrutorPorNome);

export default router;
