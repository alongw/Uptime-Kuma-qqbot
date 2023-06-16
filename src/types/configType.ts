interface Config {
  listen_port: number
  qq: number
  monitor_time: number
  mirai_api_http: {
    host: string
    port: number
    key: string
  }
  Uptime_Kuma: {
    host: string
    listen_page: string[]
  }
}

export default Config
