import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box; /* Ensures borders/padding fit inside width/height */
  }

  html, body {
    height: 100%;
    width: 100%; /* Avoids scrollbar overflow issue */
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  h1 {
    color: #D4AF37; /* Gold */
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    color: ${(props) => props.theme.textSecondary};
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 0.8rem;
  }

  button {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.textSecondary}; /* Example border */
    padding: 0.5rem 1rem;
    background: transparent;
  }
`;
