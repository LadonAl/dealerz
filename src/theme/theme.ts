/// <reference path="../theme/theme.d.ts" />
import { DefaultTheme } from "styled-components";

function _generatePallet(c1: string, c2: string, c3: string, c4: string, c5: string) {
  return {
    85: c5,
    70: c4,
    50: c3,
    30: c2,
    10: c1,
  };
}

export const theme: DefaultTheme = {
  colors: {
    base: {
      black: "#000000",
      white: "#FFFFFF",
    },
    text: {
      title: "#11142D",
      body: {
        1: "#515151",
        2: "#9A9AB0",
      },
    },
    link: {
      orange: "#F3692E",
      white: "#FFFFFF",
    },
    primary: _generatePallet("#F4F7F8", "#81D1FF", "#36B2F8", "#0887CF", "#001646"),
    secondary: _generatePallet("#FFDDD3", "#FF8F5B", "#F86338", "#B43A05", "#5F1E03"),
    accent: _generatePallet("#CAF1DA", "#5DEF97", "#0BD25A", "#00A843", "#018134"),
    other: {
      warning: "#EEAF22",
      error: "#F04461",
      success: "#41DA7E",
      info: "#F1F1F6",
    },
    system: {
      primary: "#FFFFFF",
      secondary: "#202020",
    },
    separators: {
      primary: "#E1E1FB",
      secondary: "#E1E1E1",
    },
    fill: {
      button: "#FFFFFF",
      image: "#E2E2EA",
      progressContainer: "#E2E2EA",
      text: {
        1: "#FFFFFF",
        2: "#F6F6F7",
      },
      icon: "#9A9AB0",
      disabled: "#E0E0E0",
    },
  },
  font: {
    family: '"DM Sans", sans-serif',
    weight: {
      regular: 400,
      semibold: 500,
      bold: 700,
    },
    size: {
      headers: {
        1: "62px",
        2: "48px",
        3: "39px",
        4: "31px",
        5: "24px",
        6: "16px",
      },
      display: "64px",
      title: "24px",
      headline: "16px",
      body: {
        1: "16px",
        2: "14px",
      },
      caption: "12px",
      notification: "9px",
      menu: {
        1: "16px",
        2: "14px",
      },
    },
  },
  breakpoints: {
    sm: "769px",
    md: "993px",
    lg: "1201px",
  },
};
