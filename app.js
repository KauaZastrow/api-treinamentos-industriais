import express from "express"
import instrutorRoutes from "./routes/instrutorRoutes.js"
import salaRoutes from "./routes/salaRoutes.js"
import treinamentoRoutes from "./routes/treinamentoRoutes.js"
import conexao from "./database/conexao.js"
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/instrutor", instrutorRoutes);
app.use("/sala", salaRoutes);
app.use("/treinamento", treinamentoRoutes);


async function iniciarServidor() {
    try {
        await conexao.query("SELECT 1");
        
        app.listen(PORT, () => {
            console.log(`servidor rodando em http://localhost:${PORT}`)
        })
    }catch(erro){
        console.log("Erro ao conectar o banco de dados");
        console.error(erro.message);
        process.exit(1)
    }
}
iniciarServidor()