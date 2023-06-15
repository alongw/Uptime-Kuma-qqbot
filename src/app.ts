import { logger } from './utils/log'
import config from './utils/config'
logger.info('nia-status-bot 正在启动...')
logger.info('正在读取配置文件...')
logger.info(`nia-status-bot启动成功，当前QQ账号：${config.qq}`)
import './modules/getStatus/index'
