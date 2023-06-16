import { CreateMiraiApi } from 'typescript-mirai-api-http'
import { logger } from './log'
import config from './config'
const { close, error, open, sendGroupMessage, onMessage } = CreateMiraiApi(
  config.mirai_api_http.host,
  config.mirai_api_http.port,
  config.mirai_api_http.key,
  config.qq
)
open(() => {
  logger.info('Mirai 连接成功')
})
close(() => {
  logger.warn('Mirai 连接断开')
})
error(() => {
  logger.warn('Mirai 连接失败')
})
onMessage((data) => {})

export { sendGroupMessage }
