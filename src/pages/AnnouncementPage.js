import {StyleRoot} from "radium";

import React, {useEffect, useState} from "react";
import {flexComponents, sizeComponents} from "../style/components";
import {AnnouncementComponent} from "../components/AnnouncementComponent";

export const AnnouncementPage = (props) => {

    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    return (
        <StyleRoot>
            {
                <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <AnnouncementComponent
                        setLogged={props.setLogged}
                        announcementId={props.announcementId !== undefined ? props.announcementId : props.match.params.announcementId}
                    />
                </div>
            }
        </StyleRoot>

    )
}
