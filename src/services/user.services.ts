import { injectable } from "tsyringe";
import { TUserLoginBody, TUserLoginReturn, TUserRegisterBody, TUserReturnSchema, userReturnSchema, userSchema } from "../schemas/user.schemas";
import bcrypt from "bcrypt";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";

@injectable()
export class UserServices{
    async register(body: TUserRegisterBody): Promise<TUserReturnSchema>{
        const hashPassword = await bcrypt.hash(body.password, 10)

        const newUser: TUserRegisterBody = {
            name: body.name,
            email: body.email,
            password: hashPassword
        }

        const data = await prisma.user.create({data: newUser})

        return userReturnSchema.parse(data)
    }

    async login(body: TUserLoginBody): Promise<TUserLoginReturn>{
        const user = await prisma.user.findFirst({where: {email: body.email}})

        if(!user){
            throw new AppError("User not registred", 404)
        }

        const compare = await bcrypt.compare(body.password, user.password)

        if(!compare){
            throw new AppError("E-mail and password doens't match", 403)
        }

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as string)

        return {
            accessToken: token,
            user: userReturnSchema.parse(user)
        }
    }

    async getUser(id: number): Promise<TUserReturnSchema>{
        const user = await prisma.user.findFirst({where: {id}})

        return userReturnSchema.parse(user)
    }
}