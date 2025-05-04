import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      darkBlack: string;
      black: string;
      lightBlack: string;
    };
    white: {
      darkWhite: string;
      lightWhite: string;
    };
  }
}