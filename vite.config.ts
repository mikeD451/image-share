import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react()],
    define: {
      "process.env.VITE_PROJECT_URL": JSON.stringify(process.env.VITE_ACCESS_KEY_ID),
      "process.env.VITE_SUPABASE_KEY": JSON.stringify(process.env.VITE_SECRET_ACCESS_KEY)
    },
  }
})

