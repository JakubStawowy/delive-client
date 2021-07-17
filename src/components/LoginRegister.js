import {Button, Card, Grid, TextField, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents} from "../style/components";
import {useHistory} from "react-router";
import {i18n} from "../data/i18n";
import {useAnimationStyles} from "../style/animation";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {ANIMATION_TIME} from "../data/consts";
import {StyleRoot} from "radium";
import {useState} from "react";

export const LoginRegister = () => {

    const loginItems = i18n[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].loginItems;
    const registerItems = i18n[localStorage.getItem('locale') !== undefined ? localStorage.getItem('locale') : 'en'].registerItems;
    const [bounce, setBounce] = useState(false);
    const history = useHistory();

    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME);

    const handleSubmit = (event) => {
        event.preventDefault();
        setBounce(true);
        setTimeout(()=>history.push("/home"), ANIMATION_TIME / 2);
    }

    return (
        <StyleRoot>
            <div style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation}>
                <Grid container className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <Card className={`${paddingClasses.paddingMedium}`}>
                        <Typography>
                            {loginItems.label}
                        </Typography>
                        <form className={`${flexClasses.flexColumnSpaceAround}`}>
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
                    <Card className={`${paddingClasses.paddingMedium}`}>
                        <Typography>
                            {registerItems.label}
                        </Typography>
                        <form className={`${flexClasses.flexColumnSpaceAround}`}>
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
            </div>
        </StyleRoot>
    )
}
