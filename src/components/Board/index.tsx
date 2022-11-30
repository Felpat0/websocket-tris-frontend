import { BoardType } from "./../../types/game";
import { BoardContainer, Cell } from "./style";

type Props = {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
};

export const Board: React.FC<Props> = ({ board, onCellClick }) => {
  return (
    <BoardContainer>
      {board.squares.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <Cell
              key={cellIndex}
              onClick={() => onCellClick(rowIndex, cellIndex)}
            >
              {cell}
            </Cell>
          ))}
        </div>
      ))}
    </BoardContainer>
  );
};
