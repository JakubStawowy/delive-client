import {Menu} from "./components/Menu";
import {Container, makeStyles} from "@material-ui/core";
import {LoginRegister} from "./components/LoginRegister";
import {sizeComponents} from "./style/components";
import {BrowserRouter} from "react-router-dom";
import {Redirect, Route} from "react-router";
import {Home} from "./components/Home";
import {AddNormalAnnouncement} from "./components/AddNormalAnnouncement";
import {AddDeliveryAnnouncement} from "./components/AddDeliveryAnnouncement";
import {AnnouncementType} from "./components/AnnouncementType";

import wallpaper from './uploads/wallpaper.png';
import {Test} from "./components/Test";
import {useEffect, useState} from "react";

function App() {

    const [locale, setLocale] = useState(localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en');

    const useStyles = makeStyles(({
        container: {
            height: '100%'
        },
        wallpaper: {
            position: 'fixed',
            zIndex: -1,
            height: '100%'
        }
    }));

    const classes = useStyles();
    const size = sizeComponents();

    return (
        <BrowserRouter className={classes.container}>
          <Menu locale={locale} action={setLocale}/>
          <img src={wallpaper}  alt={''} className={classes.wallpaper}/>
          <Route exact path={'/'}>
              <Redirect to={'/login'}/>
          </Route>
          <Route path={'/login'} component={LoginRegister}/>
          <Route path={'/home'} component={Home}/>
          <Route path={'/test'} component={Test}/>
          <Route path={'/addAnnouncement/normal'} component={AddNormalAnnouncement}/>
          <Route path={'/addAnnouncement/delivery'} component={AddDeliveryAnnouncement}/>
          <Route path={'/announcementType'} component={AnnouncementType}/>
        </BrowserRouter>
    );
}

export default App;
