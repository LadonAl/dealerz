import "styled-components";

interface Pallet {
  85: string;
  70: string;
  50: string;
  30: string;
  10: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      base: {
        black: string;
        white: string;
      };
      text: {
        title: string;
        body: {
          1: string;
          2: string;
        };
      };
      link: {
        orange: string;
        white: string;
      };
      primary: Pallet;
      secondary: Pallet;
      accent: Pallet;
      other: {
        warning: string;
        error: string;
        success: string;
        info: string;
      };
      system: {
        primary: string;
        secondary: string;
      };
      separators: {
        primary: string;
        secondary: string;
      };
      fill: {
        button: string;
        image: string;
        progressContainer: string;
        text: {
          1: string;
          2: string;
        };
        icon: string;
        disabled: string;
      };
    };
    font: {
      family: string;
      weight: {
        regular: number;
        semibold: number;
        bold: number;
      };
      size: {
        headers: {
          1: string;
          2: string;
          3: string;
          4: string;
          5: string;
          6: string;
        };
        display: string;
        title: string;
        headline: string;
        body: {
          1: string;
          2: string;
        };
        caption: string;
        notification: string;
        menu: {
          1: string;
          2: string;
        };
      };
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
