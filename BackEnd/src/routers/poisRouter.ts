import express from 'express'
import createPoi from '../controllers/pois/createPoi'
import poisList	 from '../controllers/pois/poisList'
import poiById from '../controllers/pois/poiById'
import poisByActive from '../controllers/pois/poisByActive'
import editPoi from '../controllers/pois/editPoi'
import deletePoi from '../controllers/pois/deletePoi'
import poisByNear from '../controllers/pois/poisByNear'


const router = express.Router()

router.post('/', createPoi)                                          // /pois/  (inserir estrutura do pois no body)
router.get('/', poisList)                                            // /pois/list
router.get('/near', poisByNear)                                      // /pois/near
router.get('/ativo/:ativo', poisByActive)                            // /pois/ativo/
router.get('/:id', poiById)                                          // /pois/idpesquisado
router.put('/:id', editPoi)                                          // /pois/idpesquisa (inserir estrutura do pois no body)
router.delete('/:id', deletePoi)                                     // /pois/idpesquisa

export default router