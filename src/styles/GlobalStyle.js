import { createGlobalStyle } from "styled-components";
import * as styles from "./variables";

const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    body{
        font-family:  'Helvetica Neue', Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI',Oxygen, Ubuntu, Cantarell, 'Open Sans',  sans-serif;
        margin: 0;
        background: ${styles.colors.appBackground};
    }
`;

export default GlobalStyle;