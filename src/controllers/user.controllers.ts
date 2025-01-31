import bcrypt from "bcrypt";
import {Request, Response } from "express";
import { signupSchema } from "../schemas/signup";
import { IUser } from "../interfaces/user.interface";
import { getAuthUserByEmail, userService } from "../services/auth.service";
import { StatusCodes } from 'http-status-codes';
import { signToken } from '../utils/jwt';
import { loginSchema } from '../schemas/signin';
import { BadRequestError } from '../utils/error-handler';
export async function register(req: Request, res: Response): Promise<void> {
    try {

      console.log("controller called");
      const { error } = await Promise.resolve(signupSchema.validate(req.body));
      if (error?.details) {
       console.log("error: " + error)
      }
  
      const { name, email, password, role } = req.body;

      const existingUser:IUser|null = await getAuthUserByEmail(email);
      if (existingUser) {
        throw new BadRequestError('Invalid credentials', 'userController.signin');
      }
      console.log("Hashing password...");
      const hashPassword = await bcrypt.hash(password, 10);
      console.log("Password hashed.");
      const newUser = await userService.create(name, email, hashPassword, role);
      console.log("Generating JWT...");
      const userJWT = signToken(newUser.id!, newUser.email!, newUser.name!);
      console.log("JWT generated.");
  
      res.status(StatusCodes.CREATED).json({ 
        message: 'User created successfully', 
        user: newUser, 
        token: userJWT 
      });
    } catch (error) {
      console.log("Erro from register",error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: error instanceof Error ? error.message : error,
      });
    }
  }
  export async function signin(req: Request, res: Response): Promise<void> {
    try {

      const { error } = await Promise.resolve(loginSchema.validate(req.body));
      if (error?.details) {
        console.log("Validation error:", error.details);
       res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Validation error',
          details: error.details,
        });
      }
  
      const { email, password } = req.body;
  
      if (!email || !password) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: 'Please provide email and password',
        });
      }
  

      const user: IUser | null = await getAuthUserByEmail(email);
      if (!user) {
        throw new BadRequestError('User not found', 'signin() method error');
      }
  

      const isValidPassword = await bcrypt.compare(password, user.password as string);
      if (!isValidPassword) {
        throw new BadRequestError('Invalid credentials', 'signin() method error');
      }
  

      const userjwt:string =signToken(
       user.id!, 
    user.email!, 
        user.name!
      )
      res.status(StatusCodes.OK).json({
        message: "User signed in successfully",
        user,
        token: userjwt,
      });
  
    } catch (error: any) {
      console.error("Error from signin:", error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Something went wrong',
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  export async function logout(req:Request,res:Response):Promise <void>{
    res.clearCookie('token');
    res.status(StatusCodes.NO_CONTENT).send();
  }