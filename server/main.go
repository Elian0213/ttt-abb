package main

import (
	"github.com/Elian0213/ttt-abb/comm"
	"github.com/Elian0213/ttt-abb/socket"
)

func main() {
	server := &comm.Server{}

	// TCP
	go server.StartServer()

	// WS Server
	socket.StartServer(server)

	// ws -> func TCP server
}
