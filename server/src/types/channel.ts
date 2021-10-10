import { Document } from 'mongoose'
import { Channel } from '../generated/graphql'

export type ChannelDoc = Channel & Document
