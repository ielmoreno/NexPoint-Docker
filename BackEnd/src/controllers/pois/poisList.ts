import { NextFunction, Response, Request } from 'express'
import { getAll } from '../../models/poiModel'

const poisList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{

        const pois = await getAll()

        if(!pois){
            return res.status(500).json({
                error:"Erro ao buscar listagem de POIs, tente novamente mais tarde!"
            })
        }
        return res.json(pois)

    }catch(error){
        console.log(error)
        next(error)
    }
}

export default poisList