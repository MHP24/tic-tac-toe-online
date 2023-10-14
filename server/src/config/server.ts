import { config } from 'dotenv'
config()

export const serverConfig = {
  port: Number(process.env.PORT ?? 3001)
}
