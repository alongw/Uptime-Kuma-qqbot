import { sendGroupMessage } from './../../utils/mirai'
import { logger } from '../../utils/log'

interface messageItemType {
  id: number
  name: string
  time: string
  statusgroup: string
}

export const sendErrorMsg = (
  messageItem: messageItemType,
  group: number | null | string
) => {
  if (group == null || isNaN(group as any)) {
    // 如果简介不是群号
    logger.warn(
      `错误出现在：\n组：${messageItem.statusgroup}\n实例ID：${messageItem.id}\n实例：${messageItem.name}`
    )
    return logger.error(`发送群消息失败，原因：群号配置错误！`)
  }
  // 发送消息
  sendGroupMessage(group as number, [
    { type: 'Plain', text: `nia-status-bot\n检测到节点线路异常！\n` },
    {
      type: 'Plain',
      text: `节点组：${messageItem.statusgroup}\n节点ID：${messageItem.id}\n节点：${messageItem.name}\n检测时间：${messageItem.time}`
    }
  ])
  logger.warn(
    `检测到节点线路异常！正在尝试发送信息...\n节点组：${messageItem.statusgroup}，节点ID：${messageItem.id}，节点：${messageItem.name}，监测时间：${messageItem.time}`
  )
}
