interface heartbeat {
  heartbeatList: {
    [key: string]: [
      {
        status: number
        time: string
        msg: string
        ping: number
      }
    ]
  }
  uptimeList: {
    [key: string]: number
  }
}

export default heartbeat
