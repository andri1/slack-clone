import { QueryDirectMessagesArgs, RecipientType } from '../../generated/graphql'
import { MessageModel } from '../../db/models'
import { Context } from '../../types'

export const directMessages = async (
  _: any,
  { recipientUserID }: QueryDirectMessagesArgs,
  { userID }: Context,
): Promise<any> => {
  return MessageModel.find({
    recipientType: RecipientType.User,
    $or: [
      {
        authorID: userID,
        recipientUserID,
      },
      {
        authorID: recipientUserID,
        recipientUserID: userID,
      },
    ],
  }).lean()
}
