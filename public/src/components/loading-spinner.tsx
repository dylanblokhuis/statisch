import { h } from 'preact';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body, #___statisch {
    width: 100%;
    height: 100%;
  }
`;

const Fullscreen = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
`;

const LoadingSpinner = () => (
  <Fullscreen>
    <GlobalStyle />
    Loading....
  </Fullscreen>
);

export default LoadingSpinner;
