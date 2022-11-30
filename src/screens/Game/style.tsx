import styled from "styled-components";
import { colors } from "../../assets/theme";

export const GameScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: ${colors.darkBlue};
  color: ${colors.viridianGreen};
  overflow: hidden;
  gap: 1rem;
`;

export const GameScreenTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  padding: 0;
  text-align: center;
`;
export const GameScreenSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const GameScreenContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  width: min(90vw, 20rem);
`;

export const GameScreenForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const GameScreenTurnText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const GameScreenWinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  font-size: 2rem;
  font-weight: 700;
  gap: 1rem;
`;
