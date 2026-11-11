import express from "express" ;
import { cadastrarSala,
    listarSalas,
    buscarSalaPorId,
    atualizarSala,
    deletarSala,
    buscarSalaPorNome
 } from "../controller/salaController.js";

 const router = express.Router();
 router.post("/", cadastrarSala);
 router.get("/", listarSalas);
 router.get("/:id", buscarSalaPorId);
 router.get("/descricao/:descricao", buscarSalaPorNome)
 router.patch("/:id", atualizarSala);
 router.delete("/:id", deletarSala);

 export default router;