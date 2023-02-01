import style from './App.module.css'
import {Home , Landing, Form, Detail} from "./views"
import { Route, useLocation } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';


function App() {

  const location = useLocation()
  

  return (
     <div className={style.App}>
      {location.pathname !== "/" && <NavBar/>}
      <Route exact path ="/" component={Landing}/>
      <Route path ="/home" render={() => <Home />}/>
      <Route path ="/create" render={() => <Form />}/>
      <Route path ="/detail/:id" component={Detail }/>
    </div>
  );
 }

export default App;
