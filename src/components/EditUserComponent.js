import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {StyleRoot} from "radium";
import {ProfileComponent} from "./ProfileComponent";
import React, {useState} from "react";
import {Button, Card, makeStyles, TextField} from "@material-ui/core";
import {editUser} from "../rest/restActions";
import {handleError} from "../actions/handlers";
import {useHistory} from "react-router";
import {validateConfirmedPassword, validateEmptyString, validatePassword} from "../actions/validators";

export const EditUserComponent = props => {
    const history = useHistory();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const useClasses = makeStyles(((theme) => ({
        container: {
            // alignItems: 'flex-end'
        },
        element: {
            width: '100%',
            marginLeft: '.5em'
        },
        button: {
            marginTop: '.5em'
        }
    })));
    const classes = useClasses();

    const [name, setName] = useState(props.userData.name);
    const [surname, setSurname] = useState(props.userData.surname);
    const [phone, setPhone] = useState(props.userData.phone);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatedNewPassword, setRepeatedNewPassword] = useState('');
    const [editPassword, setEditPassword] = useState(false);

    const saveUser = () => {
        if (editPassword && (!validateEmptyString(oldPassword) || !validatePassword(newPassword) || !validateConfirmedPassword(newPassword, repeatedNewPassword))) {
            !validateEmptyString(oldPassword) && alert("Old password must not be empty");
            !validatePassword(newPassword) && alert('Password must contain at least 8 characters. One capital letter and one number');
            !validateConfirmedPassword(newPassword, repeatedNewPassword) && alert('Password and confirmed password must match');
        } else {
            const data = editPassword ? {
                name,
                surname,
                phone,
                newPassword,
                oldPassword
            } : {
                name,
                surname,
                phone
            };

            editUser(data).then(response => {
                alert(response.data.message);
                if (response.data.operationSuccess) {
                    props.setEditUserFormOpened(false);
                }

            }).catch(error => handleError(error, history, props.setLogged));
        }
    }

    return (
        <StyleRoot>
            {
                <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceBetween} ${classes.container}`}>
                    <div className={`${flexClasses.flexRowSpaceBetween} ${classes.element}`}>
                        Name:
                        <TextField
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className={`${flexClasses.flexRowSpaceBetween} ${classes.element}`}>
                        Surname:
                        <TextField
                            value={surname}
                            onChange={e => setSurname(e.target.value)}
                        />
                    </div>
                    <div className={`${flexClasses.flexRowSpaceBetween} ${classes.element}`}>
                        Phone:
                        <TextField
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => setEditPassword(!editPassword)}
                        className={classes.button}
                    >
                        {
                            editPassword ? "Do not change password" : "Change password"
                        }
                    </Button>
                    {
                        editPassword &&
                            <div>
                                <div className={`${flexClasses.flexRowSpaceBetween} ${classes.element}`}>
                                    Old password:
                                    <TextField
                                        value={oldPassword}
                                        type={'password'}
                                        onChange={e => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className={`${flexClasses.flexRowSpaceBetween} ${classes.element}`}>
                                    New Password:
                                    <TextField
                                        value={newPassword}
                                        type={'password'}
                                        onChange={e => setNewPassword(e.target.value)}
                                    />
                                </div>
                                <div className={`${flexClasses.flexRowSpaceBetween} ${classes.element}`}>
                                    Repeat new password:
                                    <TextField
                                        value={repeatedNewPassword}
                                        type={'password'}
                                        onChange={e => setRepeatedNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                    }
                    <Button
                        variant={"contained"}
                        onClick={() => saveUser()}
                        className={classes.button}
                    >
                        Save
                    </Button>
                </Card>
            }
        </StyleRoot>
    );
}
