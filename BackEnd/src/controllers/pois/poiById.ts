import { Request, Response, NextFunction } from "express-serve-static-core";
import { getById } from "../../models/poiModel";
import { Prisma } from ".prisma/client";

const poiById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try{
        const {id} = req.params
        const poi = await getById(+id)

        if(!poi){
            return res.status(404).json({
                error: "POI não encontrado pelo ID informado!"
            })
        }

        return res.json(poi)

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

export default poiById