//import { PrismaClient } from '@prisma/client'
//import prisma from '../lib/prisma'

type Auth = "origin" | "bearer" | "secret";

export interface Context {
  //prisma: PrismaClient
  user?: {
    id: number;
    defaultProject: {
      id: string;
    };
  };
  auth: Auth;
}

export function createContext(auth: Auth): Context {
  return {
    //prisma,
    auth,
  };
}
