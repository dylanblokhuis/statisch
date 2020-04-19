import styled from 'styled-components';

const Button = styled.button`
  background: ${(props) => props.theme.color.accent};
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
`;

export default Button;
