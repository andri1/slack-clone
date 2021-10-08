import mongoose from 'mongoose'
import { mongoUrl } from '../config'

export const connectToMongoDB = async () => {
  console.debug('Connecting to MongoDB...')

  await mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.debug('MongoDB Connected!')
    })
    .catch((err) => {
      console.error('DB connection error:\n%s', err)
      process.exit(1)
    })

  mongoose.connection.on('error', (err) => console.error(`DB connection error: ${err.message}`))
}
