interface heartbeat {
  heartbeatList: {
    [key: string]: [
      {
        status: number | undefined
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
