import classes from './App.module.css'
import { Route, Redirect } from 'react-router-dom'
import Table from './Table/Table'

const App = () => (
  <div className={classes.App}>
    <h1>Table</h1>

    <Route path="/:page" component={Table} />
    <Redirect to="/1" />
  </div>
)

export default App;
