import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()
const poisSchema = z.object({
    id: z.number().int().positive(),
    nome: z.string({required_error:"O nome é um campo obrigatório"}).min(3,{message:"O tamanho mínimo do nome é de 3 caracteres"}).max(255, {message: "O tamanho máximo do nome é  255 caracteres"}),
    coordinateX: z.number({
        required_error: "Coordenada X é obrigatória",
        invalid_type_error: "Coordenada X deve ser um número inteiro e positivo",
    }).int().nonnegative({message:"Valor da Coordenada X deve ser maior ou igual a 0"}).max(360, {message: "Coordenada X deve ser menor que 360"}),
    coordinateY: z.number({
        required_error: "Coordenada Y é obrigatória",
        invalid_type_error: "Coordenada Y deve ser um número inteiro e positivo",
    }).int().nonnegative({message:"Valor da Coordenada Y deve ser maior ou igual a 0"}).max(360, {message: "Coordenada Y deve ser menor que 360"}),
    ativo:z.number().int().nonnegative().optional(),
    created_at: z.string().datetime().optional(),
})

export type pois = z.infer<typeof poisSchema>

export const validatePois = (pois: pois) => {
    return poisSchema.safeParse(pois)
}

export const validatePoisToCreate = (pois: pois) => {
    const partialPoisSchema = poisSchema.partial({
        id: true
    })
    return partialPoisSchema.safeParse(pois)
}

export const getAll = async () => {
    const pois = await prisma.pois.findMany({
        select: {
            id: true,
            nome: true,
            coordinateX: true,
            coordinateY: true,
            ativo: true,
            created_at: true
        }
    })
    return pois
}

export const getById = async (id: number) => {
    const pois = await prisma.pois.findUnique({
        where: {
           id 
        },
        select: {
            id: true,
            nome: true,
            coordinateX: true,
            coordinateY: true,
            ativo: true,
            created_at: true
        }
    })
    return pois
}

export const getByActive = async (ativo: number) => {
    const pois = await prisma.pois.findMany({
        where: {
            ativo
        },
        select: {
            id: true,
            nome: true,
            coordinateX: true,
            coordinateY: true,
            ativo: true,
            created_at: true
        }
    })
    return pois
}

export const create = async (poi: Omit<pois, "id">) => {
    const result = await prisma.pois.create({
        data: poi,
        select: {
            id: true,
        }
    })
    return result
}

export const remove = async (id: number) => {
    const poi = await prisma.pois.delete({
        where: {
           id 
        },
        select: {
            id: true,
            nome: true,
            coordinateX: true,
            coordinateY: true,
            ativo: true,
            created_at: true
        }
    })
    return poi
}

export const update = async (poi: pois) => {
    const result = await prisma.pois.update({
        where: {
            id: poi.id
        },
        data: poi,
        select: {
            id: true,
            nome: true,
            coordinateX: true,
            coordinateY: true,
            ativo: true,
            created_at: true
        }
    })
    return result
}


