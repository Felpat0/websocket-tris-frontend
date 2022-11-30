import styled from "styled-components";
import { colors } from "../../assets/theme";

export const PlayerElementContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: ${colors.middleBlueGreen};
  font-weight: bold;
  border-left: 5px solid ${colors.middleBlueGreen};
  padding-left: 0.5rem;
`;

export const PlayerElementTitle = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  padding: 0;
`;
