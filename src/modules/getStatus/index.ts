import { logger } from './../../utils/log'
import config from './../../utils/config'
import getStatus from './get'
logger.info('监控状态已经启动...')
setInterval(() => {
  logger.info('发起监测请求...')
  getStatus()
}, config.monitor_time)
