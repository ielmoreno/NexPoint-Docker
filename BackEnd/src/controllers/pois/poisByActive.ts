import { Request, Response, NextFunction } from 'express';
import { getByActive } from '../../models/poiModel';

const poisByActive = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const { ativo } = req.params
        if(!ativo){
            return res.status(400).json({
                error:"O campo ATIVO é obrigatório para a consulta!"
            })
        }
        
        const result = await getByActive(+ativo)

        if(!result){
            return res.status(500).json({
                error:"Erro ao buscar POIs, tente novamente mais tarde!"
            })
        }

        return res.json(result)

    }catch(error){
        console.log(error)
        next(error)
    }
}

export default poisByActive