import {Button, Card, Container, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import {statements} from "../data/i18n/statements";

export const LoginRegister = () => {

    const loginItems = statements[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].loginItems;
    const registerItems = statements[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].registerItems;

    const flex = flexComponents();
    const padding = paddingComponents();
    const size = sizeComponents();
    const rwd = rwdComponents();

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push("/home");
    }

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            <Card className={`${padding.paddingMedium}`}>
                <Typography>
                    {loginItems.label}
                </Typography>
                <form className={`${flex.flexColumnSpaceAround}`}>
                    <TextField label={loginItems.email}/>
                    <TextField label={loginItems.password}/>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        {loginItems.buttonLabel}
                    </Button>
                </form>
            </Card>
            <Card className={`${padding.paddingMedium}`}>
                <Typography>
                    {registerItems.label}
                </Typography>
                <form className={`${flex.flexColumnSpaceAround}`}>
                    <TextField label={registerItems.nickname}/>
                    <TextField label={registerItems.email}/>
                    <TextField label={registerItems.password}/>
                    <TextField label={registerItems.confirmPassword}/>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        {loginItems.buttonLabel}
                    </Button>
                </form>
            </Card>
        </Grid>
    )
}
