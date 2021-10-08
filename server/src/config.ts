require('dotenv').config()

export const mongoUrl = process.env.MONGODB_HOST || 'mongodb://localhost:27017/server'
export const port = process.env.PORT || 4000

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwt-secret'
export const JWT_EXP = parseInt(process.env.JWT_EXP || '2592000') // default in seconds : 3600 * 24 * 30
