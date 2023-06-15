import fs from 'fs'
import yaml from 'yaml'
import { logger } from './log'
import type configType from './../types/configType'
// 读取配置文件
try {
  fs.readFileSync('./config.yaml')
} catch (error) {
  // 没有配置文件 复制
  const defaultConfig = fs.readFileSync('./example/config-example.yaml')
  fs.writeFileSync('./config.yaml', defaultConfig, 'utf-8')
  logger.warn('未找到配置文件，已经为您创建初始配置文件，请修改！')
  process.exit()
}

// 如果找到了配置文件 解析配置文件
const config = yaml.parse(fs.readFileSync('./config.yaml', 'utf-8')) as configType

export default config
