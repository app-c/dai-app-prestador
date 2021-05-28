import axios from 'axios'
import soketio from 'socket.io-client'

const api = axios.create({
    baseURL: 'http://xinei.ddns.net'
})

const socket = soketio('http://xinei.ddns.net')

export  {api, socket}