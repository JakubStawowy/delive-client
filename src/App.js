import {Menu} from "./components/Menu";
import {makeStyles} from "@material-ui/core";
import {LoginRegister} from "./components/LoginRegister";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route} from "react-router";
import {Home} from "./components/Home";
import {AddNormalAnnouncement} from "./components/AddNormalAnnouncement";
import {AddDeliveryAnnouncement} from "./components/AddDeliveryAnnouncement";
import {AnnouncementType} from "./components/AnnouncementType";

import wallpaper from './uploads/wallpaper.png';
import {Test} from "./components/Test";
import {useState} from "react";

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
          <Route exact path={'/'}>
              <Redirect to={'/login'}/>
          </Route>
          <Route path={'/login'} component={LoginRegister} locale={locale}/>
          <Route path={'/home'} component={Home} locale={locale}/>
          <Route path={'/test'} component={Test}/>
          <Route path={'/addAnnouncement/normal'} component={AddNormalAnnouncement} locale={locale}/>
          <Route path={'/addAnnouncement/delivery'} component={AddDeliveryAnnouncement} locale={locale}/>
          <Route path={'/announcementType'} component={AnnouncementType} locale={locale}/>
        </BrowserRouter>
    );
}

export default App;
