import axios from 'axios'
import soketio from 'socket.io-client'

const api = axios.create({
    baseURL: 'http://177.47.86.198:3333/'
})

const socket = soketio('http://177.47.86.198:3333/')

export  {api, socket}