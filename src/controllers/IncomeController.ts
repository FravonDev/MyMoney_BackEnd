import { Request, Response } from "express";
import IncomeRepository from "../repositories/IncomeRepository";
import jwt from "jsonwebtoken";
import { incomeValidator } from "../services/validations/IncomeValidator";

const incomeRepository = new IncomeRepository()
export class IncomeController {
  async addIncome(req: Request, res: Response) {
    incomeValidator(req)
    const token = req.body.token || req.headers["x-access-token"];
    
    const decoded = jwt.verify(token, process.env.JWT_PASS as string) as { id: number };
    const userId = decoded.id;
    
    
    const { description, value } = req.body;    
    const newIncome = {
      value,
      description,
    };
    const income = await incomeRepository.createIncome(newIncome, userId)
    return res.status(201).json(income)
  }
} 
