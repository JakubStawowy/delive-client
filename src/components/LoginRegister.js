import {Button, Card, Container, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents} from "../style/components";

export const LoginRegister = () => {

    const flex = flexComponents();
    const padding = paddingComponents();
    const size = sizeComponents();

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Grid container className={`${flex.flexRowSpaceAround} ${size.bodyHeight}`}>
            <Card className={`${padding.padding}`}>
                <Typography>
                    Login
                </Typography>
                <form className={`${flex.flexColumnSpaceAround}`}>
                    <TextField label={'email'}/>
                    <TextField label={'password'}/>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Confirm
                    </Button>
                </form>
            </Card>
            <Card className={`${padding.padding}`}>
                <Typography>
                    Register
                </Typography>
                <form className={`${flex.flexColumnSpaceAround}`}>
                    <TextField label={'nickname'}/>
                    <TextField label={'email'}/>
                    <TextField label={'password'}/>
                    <TextField label={'confirm password'}/>
                    <Button
                        type={'submit'}
                        variant={'contained'}
                        onClick={(e)=>handleSubmit(e)}
                    >
                        Confirm
                    </Button>
                </form>
            </Card>
        </Grid>
    )
}
