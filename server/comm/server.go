package comm

import (
	"fmt"
	"net"
	"os"
)

var IP = "0.0.0.0"
var PORT = "5000"

func StartServer() {
	l, err := net.Listen("tcp", fmt.Sprintf("%s:%s", IP, PORT))

	if err != nil {
		fmt.Println(err)
		return
	}

	// Close the listener when the application closes.
	defer l.Close()

	fmt.Println("> Server started ")

	for {
		// Listening for connections
		conn, err := l.Accept()

		if err != nil {
			fmt.Println("Error accepting: ", err.Error())
			os.Exit(1)
		} else {
			fmt.Println("connected")
		}

		// Handle connections in a new goroutine.
		go handleRequest(conn)
	}
}

// Handles incoming requests.
func handleRequest(conn net.Conn) {
	// Make a buffer to hold incoming data.
	buf := make([]byte, 1024)

	// Read the incoming connection into the buffer.
	reqLen, err := conn.Read(buf)

	fmt.Println(reqLen)

	if err != nil {
		fmt.Println("Error reading:", err.Error())
	}
	// Send a response back to person contacting us.
	conn.Write([]byte("Message received."))
	// Close the connection when you're done with it.
	conn.Close()
}
