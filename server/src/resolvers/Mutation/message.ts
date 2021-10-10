import { MutationSendDirectMessageArgs, RecipientType } from '../../generated/graphql'
import { MessageModel } from '../../db/models'
import { Context } from '../../types'

export const sendDirectMessage = async (
  _: any,
  { input }: MutationSendDirectMessageArgs,
  { userID }: Context,
): Promise<any> => {
  return new MessageModel({ ...input, authorID: userID, recipientType: RecipientType.User }).save()
}
