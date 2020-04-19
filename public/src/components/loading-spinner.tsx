import { h } from 'preact';
import styled from 'styled-components';

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: rgb(28, 28, 30);
  color: #fff;
`;

const LoadingSpinner = () => <Fullscreen>Loading....</Fullscreen>;

export default LoadingSpinner;
