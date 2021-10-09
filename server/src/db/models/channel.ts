import mongoose from 'mongoose'
import { ChannelDoc } from '../../types'

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: String,
})

export const ChannelModel = mongoose.model<ChannelDoc>('channel', channelSchema)
