import socketio from 'socket.io'
import semafor from 'semafor'
import os from 'os'
import http from 'http'
import express from 'express'
import path from 'path'

export default function server(port) {
  let logger = semafor()
  let app = express();
  let server = http.Server(app);
  let io = socketio(server);  
  
  let public_path =  path.join(__dirname, '..', 'public')
  app.use(express.static(public_path))

  let ifaces = os.networkInterfaces()
  let en1 = ifaces["en1"]
  let local_ip
  for(let i in en1){
    var addr = en1[i]
    if(addr.family != "IPv4") continue
    local_ip = ["http", addr.address].join("://")
    break;
  }
  let namespace = [local_ip, port].join(":")
  
  io.on("connection", (socket) => {
    console.log("connection")
    let _card = {};
    socket.on("greetings", (card) => {
      console.log("greetings")
      _card = card
      io.emit("greetings", card)
    })
    socket.on("dump", (log) => {
      console.log("dump")
      io.emit("dump", log)
    })
    socket.on("disconnect", () => {
      console.log("disconnect")
      io.emit("goodbye", _card)
    })
  })

  server.listen(port, () => {
    logger.ok(`Server running on ${namespace}`)
  })
}
