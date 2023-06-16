import axios from './../../utils/axios'
import config from './../../utils/config'
import { sendErrorMsg } from './../sendMessage/serverError'
import type heartbeatType from './../../types/heartbeatType'
import type statusType from './../../types/statusType'
import { logger } from '../../utils/log'

export const getStatus = () => {
  const page = config.Uptime_Kuma.listen_page

  // 获取服务器状态
  page.forEach(async (e) => {
    const { data: res } = await axios.get<heartbeatType>(
      `/api/status-page/heartbeat/${e}`
    )
    // 处理数据
    const errServer = Object.keys(res.uptimeList)
      .reduce((result, key) => {
        if (res.uptimeList[key] === 0) {
          result.push(key)
        }
        return result
      }, [] as string[])
      .map((e) => e.replace(/_24$/, ''))
    if (errServer.length == 0) {
      return
    }
    // 筛选通知过的服务器
    const newErrorServer = errServer
      .map((el) => {
        if (
          res &&
          res.heartbeatList[el] &&
          typeof res.heartbeatList[el][res.heartbeatList[el].length - 2]?.status ===
            'number' &&
          res.heartbeatList[el][res.heartbeatList[el].length - 2].status === 0
        ) {
          // 早就挂了
          el = ''
        }
        return el
      })
      .filter((item) => item !== undefined && item !== null && item !== '') as string[]
    logger.warn(
      `监测到错误服务器：${errServer}，但是因为已经通知过，故本次通知计划被拦截`
    )

    if (newErrorServer.length == 0) {
      return
    }

    // 报告服务器
    const { data: status } = await axios.get<statusType>(`/api/status-page/${e}`)
    if (status == undefined) {
      return
    }
    newErrorServer.map((item) => {
      // errServer.map((item) => {
      const newdata = status.publicGroupList
        .find((e) => {
          return e.monitorList.find((el) => {
            if (el.id == item) {
              return el
            }
          })
        })
        ?.monitorList.find((e) => {
          return e.id == item
        })
      // 报告服务器错误
      makeServer(newdata as any, status.config) // { id: 9, name: '2ggggg', sendUrl: 0 }
    })
  })

  // 合成服务器错误状态
  const makeServer = (
    errServer: { id: number; name: string; sendUrl: number },
    config: any
  ) => {
    const date = new Date()
    // 消息信息
    const newInfo = {
      id: errServer.id,
      name: errServer.name,
      time: date.toLocaleString(),
      statusgroup: config.title
    }
    // 群号（未处理 就是简介）
    sendErrorMsg(newInfo, config.description)
  }
}

export default getStatus
