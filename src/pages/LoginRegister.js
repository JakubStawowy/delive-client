import {Button, Card, makeStyles, TextField} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents, validatedComponents} from "../style/components";
import {useHistory} from "react-router";
import {useAnimationStyles} from "../style/animation";
import {bounceInRight, bounceOutLeft} from "react-animations";
import {ANIMATION_TIME} from "../data/consts";
import {StyleRoot} from "radium";
import {useState} from "react";
import {checkIfEmailExists, loginUser, registerUser} from "../rest/restActions";
import {validateConfirmedPassword, validateEmail, validateEmptyString, validatePassword} from "../actions/validators";
import {ROLE, TOKEN} from "../consts/applicationConsts";
import {handleError, reconnect} from "../actions/handlers";

export const LoginRegister = (props) => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [bounce, setBounce] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [registeredPassword, setRegisteredPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [loginVisible, setLoginVisible] = useState(true);

    const [validatedEmail, setValidatedEmail] = useState(true);
    const [validatedName, setValidatedName] = useState(true);
    const [validatedSurname, setValidatedSurname] = useState(true);
    const [validatedPassword, setValidatedPassword] = useState(true);
    const [validatedConfirmedPassword, setValidatedConfirmedPassword] = useState(true);
    const [emailExists, setEmailExists] = useState(false);
    const [nicknameExists, setNicknameExists] = useState(false);

    const history = useHistory();

    const useStyles = makeStyles(((theme)=>({
        messagePanel: {
            maxWidth: '10vw',
            overflow: 'wrap',
            fontSize: '.7em',
            [theme.breakpoints.down('xs')]: {
                maxWidth: '80vw'
            }
        },
        button: {
            marginTop: '1em',
            marginBottom: '1em',
        },
        switch: {
            cursor: 'pointer',
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
        validatedEmail && validatedPassword && validatedConfirmedPassword && validateEmptyString(name) && validateEmptyString(surname) && !emailExists && !nicknameExists ?
        registerUser({
            email: registeredEmail,
            password: registeredPassword,
            name,
            surname,
            phone,
            image: 'no-image'
        }).then((response) => {
            alert(response.data.message);
            setLoginVisible(true);
        })
            .catch(error => handleError(error, history, props.setLogged))
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
                reconnect();
                localStorage.setItem(TOKEN, response.data.token);
                localStorage.setItem(ROLE, response.data.role);
                props.setLogged(true);
                // reconnect();
                history.push('/home');
            }
            else {
                alert(response.data.message);
            }
        }).catch((error) => handleError(error, history, props.setLogged));
    }

    return (
        <StyleRoot>
            <div style={bounce ? bounceOutAnimationStyles.animation : bounceInAnimationStyles.animation} className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    loginVisible &&
                    <Card className={`${paddingClasses.paddingMedium}`}>
                        <form className={`${flexClasses.flexColumnSpaceAround}`}>
                            <TextField
                                label={"Email"}
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                            <TextField
                                label={"Password"}
                                value={loginPassword}
                                type={'password'}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={(e)=>handleLoginSubmit(e)}
                                className={classes.button}
                            >
                                Login
                            </Button>
                            <a className={classes.switch} onClick={() => setLoginVisible(false)}>I don't have an account</a>
                        </form>
                    </Card>
                }
                {
                    !loginVisible &&
                    <Card className={`${paddingClasses.paddingMedium}`}>
                        <form className={`${flexClasses.flexColumnSpaceAround}`}>
                            <TextField label={'Name'} value={name} onChange={e=> {
                                setName(e.target.value);
                                setTimeout(()=>setValidatedName(validateEmptyString(e.target.value)), 500);
                            }}/>
                            <TextField label={'Surname'} value={surname} onChange={e=> {
                                setSurname(e.target.value);
                                setTimeout(()=>setValidatedSurname(validateEmptyString(e.target.value)), 500);
                            }}/>
                            <TextField label={'Phone (optional)'} value={phone} onChange={e=>setPhone(e.target.value)}/>
                            <TextField label={'Email'} value={registeredEmail} onChange={e=> {
                                setRegisteredEmail(e.target.value);
                                setTimeout(()=>setValidatedEmail(validateEmail(e.target.value)), 500);
                                checkIfEmailExists(e.target.value).then((response)=> {
                                    setEmailExists(response.data);
                                }).catch((error)=>handleError(error, history, props.setLogged));
                            }}
                                       className={ (!validatedEmail || emailExists) && validationClasses.wrongTextField }
                            />
                            <TextField label={'Password'} value={registeredPassword} type={'password'} onChange={e=> {
                                setRegisteredPassword(e.target.value);
                                setTimeout(() => {
                                    setValidatedPassword(validatePassword(e.target.value));
                                    setValidatedConfirmedPassword(validateConfirmedPassword(e.target.value, confirmedPassword));
                                }, 500);
                            }}
                                       className={ !validatedPassword && validationClasses.wrongTextField }
                            />
                            <TextField label={"Confirm password"} value={confirmedPassword} type={'password'} onChange={e=> {
                                setConfirmedPassword(e.target.value);
                                setTimeout(()=>setValidatedConfirmedPassword(validateConfirmedPassword(registeredPassword, e.target.value)), 500);
                            }}
                                       className={ !validatedConfirmedPassword && validationClasses.wrongTextField }
                            />
                            <Button
                                type={'submit'}
                                variant={'contained'}
                                onClick={(e)=>handleRegisterSubmit(e)}
                                className={classes.button}
                            >
                                register
                            </Button>
                            <a className={classes.switch} onClick={() => setLoginVisible(true)}>I already have an account</a>
                        </form>
                        <div className={classes.messagePanel}>
                            {
                                !validatedEmail && 'Wrong email pattern'
                            }
                            {
                                !validatedEmail && <br/>
                            }
                            {
                                !validatedPassword && 'Password must contain at least 8 characters. One capital letter and one number'
                            }
                            {
                                !validatedPassword && <br/>
                            }
                            {
                                !validatedConfirmedPassword && 'Password and confirmed password must match'
                            }
                            {
                                !validatedConfirmedPassword && <br/>
                            }
                            {
                                emailExists && 'Email already exists'
                            }
                            {
                                emailExists && <br/>
                            }
                        </div>
                    </Card>
                }
            </div>
        </StyleRoot>
    )
}
