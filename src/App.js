import {Menu} from "./components/Menu";
import {makeStyles} from "@material-ui/core";
import {LoginRegister} from "./pages/LoginRegister";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
// import {Home} from "./pages/Home";
import {DeliveryPage} from "./pages/DeliveryPage";
import {ProfilePage} from "./pages/ProfilePage";
// import {Messages} from "./pages/Messages";
import {RegisterOrderPage} from "./pages/RegisterOrderPage";
// import {EditOrderPage} from "./pages/EditOrderPage";
// import {OrderPage} from "./pages/OrderPage";

import wallpaper from './uploads/wallpaper.png';
import {useEffect, useState} from "react";
import {isLogged, reconnect} from "./actions/handlers";

function App() {

    const [logged, setLogged] = useState(isLogged());

    const useStyles = makeStyles(({
        container: {
            height: '100%'
        },
        wallpaper: {
            position: 'fixed',
            zIndex: -1,
            height: '100vh',
            top: 0
        }
    }));

    const classes = useStyles();

    useEffect(() => {
        if (logged) {
            reconnect();
        }
    }, []);

    return (
        <BrowserRouter className={classes.container}>
          <Menu logged={logged} setLogged={setLogged}/>
          <img src={wallpaper}  alt={''} className={classes.wallpaper}/>
          <Switch>
              <Route path={'/login'} render={()=><LoginRegister setLogged={setLogged} />}/>
              {/*<Route path={'/home'} render={()=><Home setLogged={setLogged}/>}/>*/}
              {/*<Route path={'/messages'} render={()=><Messages setLogged={setLogged}/>}/>*/}
              {/*/!*<Route path={'/test'} render={()=><Test/!* connect={connect}*!//>}/>*!/*/}
              <Route path={'/addOrder/normal'} render={()=><RegisterOrderPage setLogged={setLogged}/>}/>
              {/*<Route path={'/editOrder/:orderId'}*/}
              {/*       component={EditOrderPage}*/}
              {/*       render={()=><EditOrderPage setLogged={setLogged()}/>}/>*/}
              <Route path={'/delivery'} render={()=><DeliveryPage setLogged={setLogged}/>}/>
              {/*<Route path={'/profile/:userId'}*/}
              {/*       component={ProfilePage}*/}
              {/*       render={()=><ProfilePage setLogged={setLogged}/>} />*/}
              <Route path={'/profile'} component={ProfilePage} render={()=><ProfilePage setLogged={setLogged}/>} />
              {/*<Route path={'/order/:orderId'}*/}
              {/*       component={OrderPage}*/}
              {/*       // connect={connect}*/}
              {/*       render={()=><OrderPage setLogged={setLogged}/>} />*/}
              <Route exact path={'/'}>
                  <Redirect to={'/login'}/>
                  {/*{isLogged() ? <Redirect to={'/home'}/> : <Redirect to={'/login'}/>}*/}
              </Route>
              {/*<Route exact path={'/*'}>*/}
              {/*    {isLogged() ? <Redirect to={'/home'}/> : <Redirect to={'/login'}/>}*/}
              {/*</Route>*/}
          </Switch>
        </BrowserRouter>
    );
}

export default App;
