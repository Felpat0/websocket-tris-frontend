import styled from "styled-components";
import { colors } from "../../assets/theme";

export const Button = styled.button`
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: ${colors.ceruleanFrost};
  color: ${colors.darkBlue};
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.ceruleanFrost};
  }
`;
