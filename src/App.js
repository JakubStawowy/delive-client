import {Menu} from "./components/Menu";
import {makeStyles} from "@material-ui/core";
import {LoginRegister} from "./pages/LoginRegister";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Router, Switch} from "react-router";
import {Home} from "./pages/Home";
import {DeliveryPage} from "./pages/DeliveryPage";
import {Profile} from "./pages/Profile";
import {Messages} from "./pages/Messages";
import {RegisterAnnouncement} from "./pages/RegisterAnnouncement";
import {EditAnnouncement} from "./pages/EditAnnouncement";
import {ErrorPage} from "./pages/ErrorPage";
import {DeliveryForm} from "./components/DeliveryForm";
import {Announcement} from "./components/Announcement";

import wallpaper from './uploads/wallpaper.png';
import {Test} from "./components/Test";
import {useState} from "react";
import {isLogged} from "./actions/handlers";

function App() {

    const [locale, setLocale] = useState(
        localStorage.getItem('locale') !== undefined && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'
    );

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

    return (
        <BrowserRouter className={classes.container}>
          <Menu locale={locale} action={setLocale}/>
          <img src={wallpaper}  alt={''} className={classes.wallpaper}/>
          <Switch>
              <Route path={'/error/:code'} component={ErrorPage}/>
              <Route path={'/login'} component={LoginRegister} locale={locale} />
              <Route path={'/home'} component={Home} locale={locale}/>
              <Route path={'/messages'} component={Messages} locale={locale}/>
              <Route path={'/test'} component={Test}/>
              <Route path={'/delivery/register/:announcementId/:authorId'} component={DeliveryForm} delivery={false}/>
              <Route path={'/addAnnouncement/normal'} component={RegisterAnnouncement} locale={locale}/>
              <Route path={'/editAnnouncement/:announcementId'} component={EditAnnouncement} locale={locale}/>
              <Route path={'/delivery'} component={DeliveryPage} locale={locale}/>
              <Route path={'/profile/:userId'} component={Profile} />
              <Route path={'/profile'} component={Profile} />
              <Route path={'/announcement/:announcementId'} component={Announcement} />
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
