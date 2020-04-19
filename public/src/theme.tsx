import { h } from 'preact';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  color: {
    main: '#000',
    accent: 'rgb(0,122,255)',
    background: '#e4e4e4',
    text: '#000',
  },
  shadow: {
    smallest: '0px 4px 8px rgba(0, 0, 0, 0.12)',
    small: '0 5px 10px rgba(0, 0, 0, 0.12)',
    medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
    large: '0 30px 60px rgba(0, 0, 0, 0.12)',
    hover: '0 30px 60px rgba(0, 0, 0, 0.12)',
    sticky: '0 12px 10px -10px rgba(0, 0, 0, 0.12)',
  },
  font: {
    families: {
      main: "'Source Sans Pro', sans-serif",
    },
  },
};

const GlobalStyle = createGlobalStyle`
  html, body, #___statisch {
    width: 100%;
    height: 100%;
  }
  
  body {
    background: ${(props) => props.theme.color.background};
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Source Sans Pro', sans-serif;
  }
  
  .color {
    &-main {
      color: ${(props) => props.theme.color.main};
    }
    
    &-accent {
      color: ${(props) => props.theme.color.accent};
    }
  }
  
  .background {
    &-main {
      background: ${(props) => props.theme.color.main};
    }
    
    &-accent {
      background: ${(props) => props.theme.color.accent};
    }
  }
`;

const Theme = ({ children }: { children: any }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    {children}
  </ThemeProvider>
);

export default Theme;
