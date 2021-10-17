import {Menu} from "./components/Menu";
import {makeStyles} from "@material-ui/core";
import {LoginRegister} from "./pages/LoginRegister";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route, Router, Switch} from "react-router";
import {Home} from "./pages/Home";
import {DeliveryPage} from "./pages/DeliveryPage";
import {Profile} from "./pages/Profile";
import {Messages} from "./pages/Messages";
import {AddNormalAnnouncement} from "./pages/AddNormalAnnouncement";
import {ErrorPage} from "./pages/ErrorPage";
import {NormalCommission} from "./pages/NormalCommission";
import {Announcement} from "./components/Announcement";
import {DeliveryCommission} from "./pages/DeliveryCommission";
import {AddDeliveryAnnouncement} from "./pages/AddDeliveryAnnouncement";
import {AnnouncementType} from "./pages/AnnouncementType";

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
              <Route path={'/commission/normal/:announcementId/:authorId'} component={NormalCommission} delivery={false}/>
              <Route path={'/commission/delivery/:announcementId/:authorId'} component={DeliveryCommission} delivery={true}/>
              <Route path={'/addAnnouncement/normal'} component={AddNormalAnnouncement} locale={locale}/>
              <Route path={'/addAnnouncement/delivery'} component={AddDeliveryAnnouncement} locale={locale}/>
              <Route path={'/announcementType'} component={AnnouncementType} locale={locale}/>
              <Route path={'/delivery'} component={DeliveryPage} locale={locale}/>
              <Route path={'/profile/:userId'} component={Profile} />
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
