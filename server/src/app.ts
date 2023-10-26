import express from 'express'
import cors from 'cors'
import { serverConfig } from './config'

export const app = express()
console.log(serverConfig.clientUrl)
app.use(cors({
  origin: serverConfig.clientUrl
}))
app.use(express.json())
