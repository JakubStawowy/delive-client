import {Menu} from "./components/Menu";
import {makeStyles} from "@material-ui/core";
import {LoginRegister} from "./pages/LoginRegister";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Router, Switch, useHistory} from "react-router";
import {Home} from "./pages/Home";
import {DeliveryPage} from "./pages/DeliveryPage";
import {Profile} from "./pages/Profile";
import {Messages} from "./pages/Messages";
import {RegisterAnnouncement} from "./pages/RegisterAnnouncement";
import {EditAnnouncement} from "./pages/EditAnnouncement";
import {Announcement} from "./components/Announcement";

import wallpaper from './uploads/wallpaper.png';
import {useEffect, useState} from "react";
import {isLogged, reconnect} from "./actions/handlers";

function App() {

    const [locale, setLocale] = useState(
        localStorage.getItem('locale') !== undefined && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'pl'
    );
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
        logged && reconnect();
    }, []);

    return (
        <BrowserRouter className={classes.container}>
          <Menu locale={locale} action={setLocale}
                logged={logged} setLogged={setLogged}/>
          <img src={wallpaper}  alt={''} className={classes.wallpaper}/>
          <Switch>
              <Route path={'/login'} render={()=><LoginRegister setLogged={setLogged} />}/>
              <Route path={'/home'} render={()=><Home setLogged={setLogged}/>} locale={locale}/>
              <Route path={'/messages'} render={()=><Messages setLogged={setLogged}/>}/>
              {/*<Route path={'/test'} render={()=><Test/!* connect={connect}*!//>}/>*/}
              <Route path={'/addAnnouncement/normal'} render={()=><RegisterAnnouncement setLogged={setLogged}/>}/>
              <Route path={'/editAnnouncement/:announcementId'}
                     component={EditAnnouncement}
                     render={()=><EditAnnouncement setLogged={setLogged()}/>}/>
              <Route path={'/delivery'} render={()=><DeliveryPage setLogged={setLogged}/>}/>
              <Route path={'/profile/:userId'}
                     component={Profile}
                     render={()=><Profile setLogged={setLogged}/>} />
              <Route path={'/profile'} component={Profile} render={()=><Profile setLogged={setLogged}/>} />
              <Route path={'/announcement/:announcementId'}
                     component={Announcement}
                     // connect={connect}
                     render={()=><Announcement setLogged={setLogged}/>} />
              <Route exact path={'/'}>
                  {isLogged() ? <Redirect to={'/home'}/> : <Redirect to={'/login'}/>}
              </Route>
              <Route exact path={'/*'}>
                  {isLogged() ? <Redirect to={'/home'}/> : <Redirect to={'/login'}/>}
              </Route>
          </Switch>
        </BrowserRouter>
    );
}

export default App;
