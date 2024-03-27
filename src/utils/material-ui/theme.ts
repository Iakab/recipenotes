import { createTheme, responsiveFontSizes } from '@mui/material';

const mainTextColor = '#1a1e22';

let customTheme = createTheme({
  typography: {
    fontSize: 22,
    h2: {
      color: mainTextColor,
    },
    h3: {
      color: mainTextColor,
    },
    h4: {
      color: mainTextColor,
    },
    h5: {
      color: mainTextColor,
    },
    h6: {
      color: mainTextColor,
    },
    body1: {
      color: mainTextColor,
    },
    body2: {
      color: mainTextColor,
    },
  },
  palette: {
    text: {
      primary: '#3f413f',
      // secondary:'#d18787',
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          maxHeight: '30rem',
          maxWidth: 'fit-content',
        },
      },
    },
  },
});

customTheme = responsiveFontSizes(customTheme);

const theme = customTheme;
export default theme;
