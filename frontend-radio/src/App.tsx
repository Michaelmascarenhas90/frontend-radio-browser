import { BrowserRouter } from "react-router"
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Routes from './routes'

const customTheme = createTheme({
  palette: {
    background: {
      default: '#283954',
      paper: '#181d24'
    },
    text: {
      primary: '#e3eaf2'
    }
  }
})

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={customTheme}>

        <Routes />
      </ThemeProvider>
      <CssBaseline />
    </BrowserRouter>
  )
}

export default App
