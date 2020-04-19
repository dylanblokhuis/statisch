import { h } from 'preact';
import styled from 'styled-components';

const ErrorMsg = styled.span`
  color: #ff0004;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 0;
  margin-top: 15px;
`;

function Error({ message }: { message: string }) {
  return <ErrorMsg>{message}</ErrorMsg>;
}

export default Error;
