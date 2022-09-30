import dotenv from "dotenv";

dotenv.config();

export const { 
  PORT,
  SESSION_SECRET,  
  REDIS_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_REDIRECT, 
} = process.env;