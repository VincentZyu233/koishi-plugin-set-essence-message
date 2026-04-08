import { Context, h, Schema } from 'koishi'
import {} from "koishi-plugin-adapter-onebot"

export const name = 'set-essence-message'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command("加精", "将被引用的消息设为精华", {captureQuote: false})
    .action(async ({session}) => {
      if (!session.quote) return `${h.quote(session?.messageId)}需要引用一条消息`
      await session.onebot.setEssenceMsg(session.quote.id)
    })

  ctx.command('去精', '取消被引用消息的精华状态', { captureQuote: false })
    .action(async ({ session }) => {
      if (!session.quote) return `${h.quote(session?.messageId)}需要引用一条消息`
      await session.onebot.deleteEssenceMsg(session.quote.id)
    })
}


/**
 * 
 * onebot适配器的封装：
root@bawuyinguo:/home/bawuyinguo/SSoftwareFiles/koishi/AAA_from_git_AAA/koishi-plugin-adapter-onebot# rg -i EssenceMsg
readme.md
121:- [`onebot.setEssenceMsg()`](https://docs.go-cqhttp.org/api/#设置精华消息)
122:- [`onebot.deleteEssenceMsg()`](https://docs.go-cqhttp.org/api/#移出精华消息)
123:- [`onebot.getEssenceMsgList()`](https://docs.go-cqhttp.org/api/#获取精华消息列表)

src/types.ts
421:  setEssenceMsg(message_id: id): Promise<void>
422:  setEssenceMsgAsync(message_id: id): Promise<void>
423:  deleteEssenceMsg(message_id: id): Promise<void>
424:  deleteEssenceMsgAsync(message_id: id): Promise<void>
432:  getEssenceMsgList(group_id: id): Promise<EssenceMessage[]>
root@bawuyinguo:/home/bawuyinguo/SSoftwareFiles/koishi/AAA_from_git_AAA/koishi-plugin-adapter-onebot# 
 */