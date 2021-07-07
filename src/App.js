import {Header} from "./components/Header";
import {Container, makeStyles} from "@material-ui/core";
import {LoginRegister} from "./components/LoginRegister";
import {sizeComponents} from "./style/components";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route} from "react-router";
import {Home} from "./components/Home";

function App() {

    const useStyles = makeStyles(({
        container: {
            height: '100%'
        }
    }));

    const classes = useStyles();
    const size = sizeComponents();

    return (
        <BrowserRouter className={classes.container}>
          <Header />
          <Route exact path={'/'}>
              <Redirect to={'/login'}/>
          </Route>
          <Route path={'/login'} component={LoginRegister}/>
          <Route path={'/home'} component={Home}/>
        </BrowserRouter>
    );
}

export default App;
