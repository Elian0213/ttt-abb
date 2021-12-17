package comm

import (
	"fmt"
	"net"
	"os"
	"time"
)

var IP = "0.0.0.0"
var PORT = "5000"

type Client struct {
	conn net.Conn
}

type Server struct {
	clients []Client
}

func (s *Server) StartServer() {
	l, err := net.Listen("tcp", fmt.Sprintf("%s:%s", IP, PORT))

	if err != nil {
		fmt.Println(err)
		return
	}

	// Close the listener when the application closes.
	defer l.Close()

	fmt.Println("[TCP] > Server started ")

	for {
		// Listening for connections
		conn, err := l.Accept()

		if err != nil {
			fmt.Println("Error accepting: ", err.Error())
			os.Exit(1)
		} else {
			fmt.Printf("[TCP] > New connection: %s \n", conn.LocalAddr())
		}

		s.clients = append(s.clients, Client{conn: conn})

		go keepAlive(conn)
	}
}

func keepAlive(conn net.Conn) {
	for range time.Tick(time.Second * 1) {
		conn.Write([]byte("0"))
	}
}

// Handles incoming requests.
func (s *Server) GetClients() []net.Conn {
	var connections []net.Conn

	for _, client := range s.clients {
		connections = append(connections, client.conn)
	}

	return connections
}

func (s *Server) SendMessage(data string) {
	for _, client := range s.clients {
		client.sendData(data)
	}
}

func (c *Client) sendData(data string) {
	c.conn.Write([]byte(data))
}
