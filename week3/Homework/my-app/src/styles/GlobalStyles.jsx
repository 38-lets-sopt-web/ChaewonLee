import { Global, css } from '@emotion/react';

const style = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    font-family: inherit;
    font-size: inherit;
  }

  ul, li {
    list-style: none;
  }
`;

const GlobalStyles = () => <Global styles={style} />;
export default GlobalStyles;