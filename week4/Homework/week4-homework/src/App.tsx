import './styles/globalStyle.css'
import AppRouter from './routes/AppRouter'
import { themeClass } from './styles/theme.css'

function App() {

  return (
    <div className={ themeClass }>
      <AppRouter />
    </div>
  )
}

export default App
