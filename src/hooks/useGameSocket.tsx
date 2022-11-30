import React from "react";
import { io, Socket } from "socket.io-client";
import { BoardType } from "../types/game";

export const useGameSocket = (url?: string) => {
  const [gameSocket, setGameSocket] = React.useState<Socket>();
  const [board, _setBoard] = React.useState<BoardType>();
  const [room, _setRoom] = React.useState<string>();
  const [players, _setPlayers] = React.useState<string[]>([]);

  const boardRef = React.useRef(board);
  const setBoard = (data: BoardType) => {
    boardRef.current = data;
    _setBoard(data);
  };

  const roomRef = React.useRef(room);
  const setRoom = (data: string) => {
    roomRef.current = data;
    _setRoom(data);
  };

  const playersRef = React.useRef(players);
  const setPlayers = (data: string[]) => {
    playersRef.current = data;
    _setPlayers(data);
  };

  const formatBoard = React.useCallback((board: BoardType) => {
    console.log("wei", playersRef.current);
    return {
      squares: board.squares.map((row) =>
        row.map((cell) => {
          if (!cell || playersRef.current.indexOf(cell) === -1)
            return undefined;
          if (playersRef.current.indexOf(cell) === 0) return "X";
          if (playersRef.current.indexOf(cell) === 1) return "O";
          return undefined;
        })
      ),
    };
  }, []);

  React.useEffect(() => {
    if (!gameSocket) {
      let socket: Socket;
      if (url) socket = io(url);
      else socket = io();

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("message", (message) => {
        console.log(message);
        const { type, payload } = message;

        switch (type) {
          case "board":
            setBoard(formatBoard(payload.board));
            break;
          case "room":
            setRoom(payload.room);
            break;
          case "players":
            setPlayers(payload.players);
            break;
          default:
            break;
        }
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      setGameSocket(socket);
    }
  }, [url, gameSocket, formatBoard]);

  const sendPing = () => {
    gameSocket?.send("ping");
  };

  const requestInfo = () => {
    gameSocket?.emit("message", {
      type: "info",
    });
  };

  const joinRoom = (roomToJoin: string) => {
    gameSocket?.emit("message", {
      type: "join",
      payload: { room: roomToJoin },
    });
  };

  const startGame = () => {
    gameSocket?.emit("message", { type: "start", payload: { room } });
  };

  const play = (row: number, col: number) => {
    gameSocket?.emit("message", {
      type: "play",
      payload: { room, row, col },
    });
  };

  return {
    gameSocket,
    board,
    room,
    sendPing,
    requestInfo,
    joinRoom,
    startGame,
    play,
  };
};
