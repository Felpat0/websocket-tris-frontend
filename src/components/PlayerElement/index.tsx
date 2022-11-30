import { PlayerType } from "../../types/game";
import { PlayerElementContainer, PlayerElementTitle } from "./style";

type Props = {
  player: PlayerType;
};

export const PlayerElement: React.FC<Props> = ({ player }) => {
  return (
    <PlayerElementContainer>
      <PlayerElementTitle>{player.name}</PlayerElementTitle>
    </PlayerElementContainer>
  );
};
