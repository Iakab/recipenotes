import { createTheme } from '@mui/material';

const theme = createTheme({
  typography: {
    fontSize: 24,
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

export default theme;
