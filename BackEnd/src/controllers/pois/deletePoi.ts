import { Request, Response, NextFunction } from 'express'
import { remove } from '../../models/poiModel'
import { Prisma } from '.prisma/client'

const deletePoi = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {id} = req.params
        const poi = await remove(+id)

        res.status(200).json({
            message: "POI removido com sucesso!",
            poi
        })
    }catch(error){
        console.log(error)
        if(error instanceof Prisma.PrismaClientKnownRequestError){
            if(error?.code === 'P2025'){
                return res.status(404).json({
                    error: "POI não encontrado"
                })
            }
            next(error)
        }
    }
}

export default deletePoi