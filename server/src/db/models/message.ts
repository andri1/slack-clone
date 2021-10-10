import mongoose, { Schema } from 'mongoose'
import { RecipientType } from '../../generated/graphql'
import { MessageDoc } from '../../types'

const messageSchema = new mongoose.Schema(
  {
    authorID: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    content: String,
    recipientType: {
      type: String,
      enum: Object.values(RecipientType),
    },
    recipientUserID: Schema.Types.ObjectId,
    channelrID: Schema.Types.ObjectId,
  },
  { timestamps: true },
)

export const MessageModel = mongoose.model<MessageDoc>('message', messageSchema)
