import styled from "styled-components";
export const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 50vw;
  aspect-ratio: 1/1;
  background-color: #fff;
`;

export const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #000;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  aspect-ratio: 1/1;
`;

export const CellX = styled(Cell)`
  color: #f00;
`;

export const CellO = styled(Cell)`
  color: #00f;
`;
