import React from "react";
import { io, Socket } from "socket.io-client";
import { BoardType, PlayerType } from "../types/game";

export const useGameSocket = (url?: string) => {
  const [gameSocket, setGameSocket] = React.useState<Socket>();
  const [board, _setBoard] = React.useState<BoardType>();
  const [room, _setRoom] = React.useState<string>();
  const [players, _setPlayers] = React.useState<PlayerType[]>([]);
  const [currentPlayer, setCurrentPlayer] = React.useState<PlayerType>();
  const [lastWinner, setLastWinner] = React.useState<PlayerType>();
  const [isADraw, setIsADraw] = React.useState<boolean>(false);

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
  const setPlayers = (data: PlayerType[]) => {
    playersRef.current = data;
    _setPlayers(data);
  };

  const formatBoard = React.useCallback((board: BoardType) => {
    return {
      squares: board.squares.map((row) =>
        row.map((cell) => {
          const playerIndex = playersRef.current.findIndex(
            (p) => p.id === cell
          );
          if (!cell || playerIndex === -1) return undefined;
          if (playerIndex === 0) return "X";
          if (playerIndex === 1) return "O";
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
          case "info":
            if (payload.room) setRoom(payload.room);
            if (payload.players) setPlayers(payload.players);
            if (payload.board) setBoard(formatBoard(payload.board));
            if (payload.currentPlayer) setCurrentPlayer(payload.currentPlayer);
            if (payload.winner) setLastWinner(payload.winner);
            if (payload.reset) {
              setLastWinner(undefined);
              setIsADraw(false);
            }
            if (payload.draw) setIsADraw(true);
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

  const joinRoom = (roomToJoin: string, name: PlayerType["name"]) => {
    gameSocket?.emit("message", {
      type: "join",
      payload: { room: roomToJoin, name },
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

  const reset = () => {
    setPlayers([]);
    setLastWinner(undefined);
    gameSocket?.emit("message", { type: "reset", payload: { room } });
  };

  return {
    gameSocket,
    board,
    room,
    players,
    currentPlayer,
    lastWinner,
    isADraw,
    sendPing,
    requestInfo,
    joinRoom,
    startGame,
    play,
    reset,
  };
};
