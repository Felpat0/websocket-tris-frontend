import React, { useCallback } from "react";
import { Board } from "../../components/Board";
import { Button } from "../../components/Button";
import { Center } from "../../components/Center";
import { Input } from "../../components/Input";
import { PlayerElement } from "../../components/PlayerElement";
import { useGameSocket } from "../../hooks/useGameSocket";
import {
  GameScreenContainer,
  GameScreenContent,
  GameScreenForm,
  GameScreenSubtitle,
  GameScreenTitle,
  GameScreenTurnText,
  GameScreenWinContainer,
} from "./style";

export const GameScreen: React.FC = () => {
  const [nameInput, setNameInput] = React.useState("");
  const [roomInput, setRoomInput] = React.useState<string>("");
  const {
    gameSocket,
    board,
    room,
    players,
    currentPlayer,
    lastWinner,
    isADraw,
    joinRoom,
    startGame,
    play,
    reset,
  } = useGameSocket("http://localhost:4000");

  const handleJoinRoom: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        joinRoom(roomInput, nameInput);
      },
      [joinRoom, roomInput, nameInput]
    );
  console.log("lol", currentPlayer, gameSocket?.id);
  return (
    <GameScreenContainer>
      <GameScreenTitle>Tic Tac Toe</GameScreenTitle>
      <GameScreenContent>
        {!room ? (
          <GameScreenForm>
            <Input
              type={"text"}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder={"Your name"}
            />
            <Input
              type={"text"}
              value={roomInput}
              onChange={(e) => setRoomInput(e.target.value)}
              placeholder={"Room name"}
            />
            <Button onClick={handleJoinRoom} type={"submit"}>
              Join room
            </Button>
          </GameScreenForm>
        ) : !board ? (
          <>
            <GameScreenSubtitle>{`Players: (Room: ${room})`}</GameScreenSubtitle>
            {players.map((player) => (
              <PlayerElement player={player} key={player.id} />
            ))}
            <Button onClick={startGame}>Start game</Button>
          </>
        ) : (
          <Center>
            <Board board={board} onCellClick={play} />
            <GameScreenTurnText>
              {currentPlayer?.id === gameSocket?.id
                ? "Your turn!"
                : `${currentPlayer?.name}'s turn!`}
            </GameScreenTurnText>
          </Center>
        )}
        {(lastWinner || isADraw) && (
          <GameScreenWinContainer>
            {lastWinner ? `${lastWinner.name} won!!` : `It's a draw!`}
            <Button onClick={reset}>Restart game</Button>
          </GameScreenWinContainer>
        )}
      </GameScreenContent>
    </GameScreenContainer>
  );
};
