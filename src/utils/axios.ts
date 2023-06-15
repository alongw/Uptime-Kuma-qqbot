import axios from 'axios'
import config from './config'

const req = axios.create({
  baseURL: config.Uptime_Kuma.host
})

export default req
