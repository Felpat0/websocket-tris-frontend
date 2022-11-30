import React from "react";
import { Board } from "../../components/Board";
import { useGameSocket } from "../../hooks/useGameSocket";

export const GameScreen: React.FC = () => {
  const [roomInput, setRoomInput] = React.useState<string>("");
  const { board, room, joinRoom, startGame, play } = useGameSocket(
    "http://localhost:4000"
  );

  return (
    <div>
      <h1>Test Websocket</h1>
      {!room ? (
        <>
          <input
            type={"text"}
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
          />
          <button onClick={() => joinRoom(roomInput)}>Join room</button>
        </>
      ) : !board ? (
        <>
          <button onClick={startGame}>Start game</button>
        </>
      ) : (
        <Board board={board} onCellClick={play} />
      )}
    </div>
  );
};
