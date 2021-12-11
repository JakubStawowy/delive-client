import React, {useEffect, useState} from 'react';
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {StyleRoot} from "radium";
import {ProfileComponent} from "../components/ProfileComponent";

export const ProfilePage = props => {

    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    return (
        <StyleRoot>
            {
                <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <ProfileComponent
                        userId={props.userId !== undefined ? props.userId : props.match.params.userId}
                        setLogged={props.setLogged}
                    />
                </div>
            }
        </StyleRoot>
    );
}
