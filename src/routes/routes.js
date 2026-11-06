import {Router} from 'express'
import ClienteController from '../controllers/ClienteController.js'
import VeiculoController from '../controllers/VeiculoController.js'
import AgendamentoController from '../controllers/AgendamentoController.js'

const router = Router()

//Rotas para o cliente
router.get('/clientes', ClienteController.listar);
router.post('/clientes', ClienteController.criar);

//Rotas para veículos
router.post('/veiculos', VeiculoController.criar);

//Rotas para agendamnetos
router.post('/agendamentos', AgendamentoController.criar);

export default router;