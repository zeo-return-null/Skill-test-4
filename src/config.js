import dotenv from "dotenv";

dotenv.config();

export const { 
  PORT,
  SESSION_SECRET,  
  REDIS_URL,
  

} = process.env;