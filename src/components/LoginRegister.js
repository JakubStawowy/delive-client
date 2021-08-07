import {Button, Card, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents, validatedComponents} from "../style/components";
import {useHistory} from "react-router";
import {i18n} from "../data/i18n";
import {useAnimationStyles} from "../style/animation";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {ANIMATION_TIME} from "../data/consts";
import {StyleRoot} from "radium";
import {useState} from "react";
import {checkIfEmailExists, checkIfNicknameExists, registerUser} from "../actions/restActions";
import {validateConfirmedPassword, validateEmail, validatePassword} from "../actions/validators";

export const LoginRegister = () => {

    const loginItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].loginItems;
    const registerItems = i18n[
        localStorage.getItem('locale') !== undefined
        && localStorage.getItem('locale') !== null
            ? localStorage.getItem('locale') : 'en'].registerItems;

    const [bounce, setBounce] = useState(false);
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = (event) => {
        event.preventDefault();
        validatedEmail && validatedPassword && validatedConfirmedPassword && !emailExists && !nicknameExists ?
        registerUser({
            'email': email,
            'password': password,
            'userDetails': {
                'nickname': nickname,
                'name': null,
                'surname': null,
                'phone': null,
                'image': 'no-image'
            }
        }).then(() => {
            alert('User registered successfully');
            setBounce(true);
            setTimeout(()=>history.push("/home"), ANIMATION_TIME / 2);
        }).catch(error => alert(error))
            :
            alert("Nope")

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
                            <TextField label={registerItems.nickname} value={nickname} onChange={e=> {
                                setNickname(e.target.value);
                                checkIfNicknameExists(e.target.value).then((response)=>setNicknameExists(response.data)).catch((error)=>alert(error));
                            }}
                            className={ nicknameExists && validationClasses.wrongTextField }
                            />
                            <TextField label={registerItems.email} value={email} onChange={e=> {
                                setEmail(e.target.value);
                                setTimeout(()=>setValidatedEmail(validateEmail(e.target.value)), 500);
                                checkIfEmailExists(e.target.value).then((response)=> {
                                    setEmailExists(response.data);
                                }).catch((error)=>alert(error));
                            }}
                            className={ (!validatedEmail || emailExists) && validationClasses.wrongTextField }
                            />
                            <TextField label={registerItems.password} value={password} type={'password'} onChange={e=> {
                                setPassword(e.target.value);
                                setTimeout(()=> {
                                    setValidatedPassword(validatePassword(e.target.value));
                                    setValidatedConfirmedPassword(validateConfirmedPassword(e.target.value, confirmedPassword));
                                }, 500);
                            }}
                           className={ !validatedPassword && validationClasses.wrongTextField }
                            />
                            <TextField label={registerItems.confirmPassword} value={confirmedPassword} type={'password'} onChange={e=> {
                                setConfirmedPassword(e.target.value);
                                setTimeout(()=>setValidatedConfirmedPassword(validateConfirmedPassword(password, e.target.value)), 500);
                            }}
                           className={ !validatedConfirmedPassword && validationClasses.wrongTextField }
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={(e)=>handleSubmit(e)}
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
