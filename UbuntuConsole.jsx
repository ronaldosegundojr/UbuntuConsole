import React, { useState, useEffect } from "react";
import "./UbuntuConsole.css";

const UbuntuConsole = () => {
  const [inputValue, setInputValue] = useState("");
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Cursor animation
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  const handleCommand = (command) => {
    const args = command.split(" "); // Permite pegar argumentos
    const mainCommand = args[0];

    switch (mainCommand) {
      case "/help":
        addOutput([
          "Available commands:",
          "  /help          - Show available commands.",
          "  /linkedin      - Show LinkedIn link.",
          "  /github        - Show GitHub link.",
          "  /skills        - Show programming skills.",
          "  run coelho        - Show a rabbit animation.",
          "  clear         - Clear the terminal.",
          "  ifconfig       - Simulate ifconfig output.",
          "  ls             - List fake files.",
          "  ping           - Simulate ping to a host.",
          "  nmap           - Simulate an nmap scan.",
          "  cat            - View contents of a file.",
          "  pwd            - Show current working directory.",
          "  whoami         - Show logged-in user.",
        ]);
        break;
      case "/linkedin":
        addOutput("https://www.linkedin.com/in/r-segundojr");
        break;
      case "/github":
        addOutput("https://www.github.com/ronaldosegundojr");
        break;
      case "/skills":
        addOutput(
          "My skills: Python, JavaScript, HTML, CSS, Google Analytics 4, Google Tag Manager, Tableau, SQL Server, SQL"
        );
        break;
      case "run coelho":
        addOutput(<img src="./coelho.gif" alt="Running Rabbit" style={{ width: "100%" }} />);
        break;
      case "ifconfig":
        addOutput([
          "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500",
          "      inet 192.168.0.101 netmask 255.255.255.0 broadcast 192.168.0.255",
          "      inet6 fe80::1a2b:3c4d:5e6f prefixlen 64 scopeid 0x20<link>",
          "      RX packets 12034 bytes 1356734 (1.3 MB)",
          "      TX packets 8921 bytes 982341 (982 KB)",
        ]);
        break;
      case "ls":
        addOutput("matrix.sh  white_rabbit.py  dont_click.exe  readme.txt");
        break;
      case "ping":
        if (args[1]) {
          const host = args[1];
          addOutput([
            `PING ${host} (93.184.216.34): 56 data bytes`,
            "64 bytes from 93.184.216.34: icmp_seq=0 ttl=56 time=20.2 ms",
            "64 bytes from 93.184.216.34: icmp_seq=1 ttl=56 time=21.3 ms",
            "64 bytes from 93.184.216.34: icmp_seq=2 ttl=56 time=19.8 ms",
            "---",
            `PING statistics for ${host}:`,
            "3 packets transmitted, 3 received, 0% packet loss, time 301ms",
          ]);
        } else {
          addOutput("Usage: ping [hostname]");
        }
        break;
      case "nmap":
        if (args[1]) {
          const target = args[1];
          addOutput([
            `Starting Nmap 7.92 ( https://nmap.org ) at 2024-12-02 19:40`,
            `Nmap scan report for ${target} (93.184.216.34)`,
            "Host is up (0.020s latency).",
            "Not shown: 995 closed ports",
            "PORT     STATE SERVICE",
            "22/tcp   open  ssh",
            "80/tcp   open  http",
            "443/tcp  open  https",
          ]);
        } else {
          addOutput("Usage: nmap [target]");
        }
        break;
      case "/clear":
        setConsoleOutput([]);
        break;
      case "cat":
        if (args[1]) {
          switch (args[1]) {
            case "matrix.sh":
              addOutput([
                "Running the Matrix...",
                "The matrix follows you...",
                "Decrypting... ████████████████████",
                "Run, the matrix is with you...",
                "SysAdmin alert: Root access obtained.",
              ]);
              break;
            case "white_rabbit.py":
              addOutput([
                "import time",
                "while True:",
                "    print('Follow the white rabbit...')",
                "    time.sleep(1)",
              ]);
              break;
            case "dont_click.exe":
              addOutput([
                "Warning: This file might break the system.",
                "Are you sure you want to run it? (y/n)",
                "Risk analysis: HIGH",
                "Proceed with caution...",
              ]);
              break;
            default:
              addOutput(`cat: ${args[1]}: No such file`);
              break;
          }
        } else {
          addOutput("Usage: cat [filename]");
        }
        break;
      case "pwd":
        addOutput("/home/neo");
        break;
      case "whoami":
        addOutput("neo");
        break;
      default:
        addOutput("Command not recognized. Type /help to see options.");
    }
  };

  const addOutput = (output) => {
    setConsoleOutput((prev) => [
      ...prev,
      ...(Array.isArray(output) ? output : [output]),
    ]);
  };

  const handleInput = (e) => {
    if (e.key === "Enter") {
      const command = inputValue.trim();
      if (command) {
        addOutput(`> ${command}`);
        handleCommand(command);
        setInputValue("");
      }
    }
  };

  return (
    <div className="console-ubuntu">
      <h1 className="console-title">
        If you wish, you can interact with the console below
      </h1>
      <div className="console-container">
        <div className="console-header">
          <div className="user-info">
            <span className="user">neo@neo-pc:</span>
            <span className="directory"> ~</span>
          </div>
          <div className="menu">
            <span className="menu-item">File</span>
            <span className="menu-item">Edit</span>
            <span className="menu-item">View</span>
            <span className="menu-item">Search</span>
            <span className="menu-item">Terminal</span>
            <span className="menu-item">Help</span>
          </div>
        </div>
        <div className="console-body">
          {consoleOutput.map((output, index) => (
            <p key={index}>{output}</p>
          ))}
        </div>
        <div className="console-input">
          <span className="prompt">&gt;&nbsp;</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInput}
            placeholder="Type /help to see commands"
          />
        </div>
      </div>
    </div>
  );
};

export default UbuntuConsole;
