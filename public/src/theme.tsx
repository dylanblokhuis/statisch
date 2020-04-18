import { h } from 'preact';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const theme = {
  color: {
    main: '#000',
    accent: 'rgb(255,59,48)',
    background: '#e4e4e4',
  },
};

const GlobalStyle = createGlobalStyle`
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
