import styled from "styled-components";
import { colors } from "../../assets/theme";

export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: min(90vw, 20rem);
  max-width: min(90vw, 20rem);
  aspect-ratio: 1/1;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  color: ${colors.darkBlue};
  background-color: ${colors.ceruleanFrost};
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  aspect-ratio: 1/1;
`;
