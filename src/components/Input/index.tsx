import styled from "styled-components";
import { colors } from "../../assets/theme";

export const Input = styled.input`
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 0.2rem 0.1rem;
  background-color: ${colors.ceruleanFrost};

  &:focus {
    outline: none;
    border: 1px solid ${colors.ceruleanFrost};
  }

  &::placeholder {
    color: ${colors.darkBlue};
  }
`;
