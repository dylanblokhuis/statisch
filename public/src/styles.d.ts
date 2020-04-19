import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      main: string;
      accent: string;
      background: string;
      text: string;
    };
    shadow: {
      smallest: string,
      small: string,
      medium: string,
      large: string,
      hover: string,
      sticky: string,
    },
    font: {
      families: {
        main: string
      }
    },
  }
}
