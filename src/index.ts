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
