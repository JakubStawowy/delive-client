import {Button, Card, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents, validatedComponents} from "../style/components";
import {useHistory} from "react-router";
import {i18n} from "../data/i18n";
import {useAnimationStyles} from "../style/animation";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {ANIMATION_TIME} from "../data/consts";
import {StyleRoot} from "radium";
import {useState} from "react";
import {checkIfEmailExists, checkIfNicknameExists, loginUser, registerUser} from "../actions/restActions";
import {validateConfirmedPassword, validateEmail, validatePassword} from "../actions/validators";
import {ROLE, TOKEN, USER_ID} from "../consts/applicationConsts";
import {handleError} from "../actions/handlers";

export const LoginRegister = () => {

    const loginItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].loginItems;
    const registerItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].registerItems;

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [bounce, setBounce] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');

    const [validatedEmail, setValidatedEmail] = useState(true);
    const [validatedPassword, setValidatedPassword] = useState(true);
    const [validatedConfirmedPassword, setValidatedConfirmedPassword] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [nicknameExists, setNicknameExists] = useState(false);

    const history = useHistory();

    const useStyles = makeStyles((()=>({
        messagePanel: {
            maxWidth: '10vw',
            overflow: 'wrap'
        }
    })));

    const classes = useStyles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const validationClasses = validatedComponents();
    const bounceInAnimationStyles = useAnimationStyles(bounceInRight, ANIMATION_TIME);
    const bounceOutAnimationStyles = useAnimationStyles(bounceOutLeft, ANIMATION_TIME);

    const handleRegisterSubmit = (event) => {
        event.preventDefault();
        validatedEmail && validatedPassword && validatedConfirmedPassword && !emailExists && !nicknameExists ?
        registerUser({
            email: registeredEmail,
            password: registeredPassword,
            name: null,
            surname: null,
            phone: null,
            image: 'no-image'
        }).then((response) => alert(response.data.message)).catch(error => handleError(error, history))
            :
            alert("Nope")

    }

    const handleLoginSubmit = (event) => {

        event.preventDefault();
        loginUser({
            email: loginEmail,
            password: loginPassword
        }).then((response)=> {

            if (response.data.operationSuccess) {
                localStorage.setItem(TOKEN, response.data.token);
                localStorage.setItem(USER_ID, response.data.userId);
                localStorage.setItem(ROLE, response.data.role);

                history.push('/home');
            }
            else {
                alert(response.data.message);
            }
        }).catch((error) => handleError(error, history));
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
                            <TextField
                                label={loginItems.email}
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <TextField
                                label={loginItems.password}
                                value={loginPassword}
                                type={'password'}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={(e)=>handleLoginSubmit(e)}
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
                            <TextField label={registerItems.email} value={registeredEmail} onChange={e=> {
                                setRegisteredEmail(e.target.value);
                                setTimeout(()=>setValidatedEmail(validateEmail(e.target.value)), 500);
                                checkIfEmailExists(e.target.value).then((response)=> {
                                    setEmailExists(response.data);
                                }).catch((error)=>alert(error));
                            }}
                            className={ (!validatedEmail || emailExists) && validationClasses.wrongTextField }
                            />
                            <TextField label={registerItems.password} value={registeredPassword} type={'password'} onChange={e=> {
                                setRegisteredPassword(e.target.value);
                                setTimeout(() => {
                                    setValidatedPassword(validatePassword(e.target.value));
                                    setValidatedConfirmedPassword(validateConfirmedPassword(e.target.value, confirmedPassword));
                                }, 500);
                            }}
                           className={ !validatedPassword && validationClasses.wrongTextField }
                            />
                            <TextField label={registerItems.confirmPassword} value={confirmedPassword} type={'password'} onChange={e=> {
                                setConfirmedPassword(e.target.value);
                                setTimeout(()=>setValidatedConfirmedPassword(validateConfirmedPassword(registeredPassword, e.target.value)), 500);
                            }}
                           className={ !validatedConfirmedPassword && validationClasses.wrongTextField }
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={(e)=>handleRegisterSubmit(e)}
                            >
                                {loginItems.buttonLabel}
                            </Button>
                        </form>
                        <div className={classes.messagePanel}>
                            <Typography variant={'text'}>
                                {
                                    !validatedEmail && registerItems.validationMessages.wrongEmail
                                }
                                {
                                    !validatedEmail && <br/>
                                }
                                {
                                    !validatedPassword && registerItems.validationMessages.wrongPassword
                                }
                                {
                                    !validatedPassword && <br/>
                                }
                                {
                                    !validatedConfirmedPassword && registerItems.validationMessages.wrongConfirmedPassword
                                }
                                {
                                    !validatedConfirmedPassword && <br/>
                                }
                                {
                                    emailExists && registerItems.validationMessages.emailExists
                                }
                                {
                                    emailExists && <br/>
                                }
                                {
                                    nicknameExists && registerItems.validationMessages.nicknameExists
                                }
                                {
                                    nicknameExists && <br/>
                                }
                            </Typography>
                        </div>
                    </Card>
                </Grid>
            </div>
        </StyleRoot>
    )
}
