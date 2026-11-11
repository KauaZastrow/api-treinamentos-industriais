import express from "express" ;
import { cadastrarTreinamento,
    listarTreinamentos,
    buscarTreinamentoPorId,
    atualizarTreinamento,
    deletarTreinamento,
    buscarTreinamentoPorNome
 } from "../controller/treinamentoController.js";

 const router = express.Router();
 router.post("/", cadastrarTreinamento);
 router.get("/", listarTreinamentos);
 router.get("/:id", buscarTreinamentoPorId);
 router.get("/descricao/:descricao", buscarTreinamentoPorNome)
 router.patch("/:id", atualizarTreinamento);
 router.delete("/:id", deletarTreinamento);

 export default router;