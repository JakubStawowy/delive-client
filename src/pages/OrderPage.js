import {StyleRoot} from "radium";

import React, {useEffect, useState} from "react";
import {flexComponents, sizeComponents} from "../style/components";
import {OrderComponent} from "../components/OrderComponent";

export const OrderPage = (props) => {

    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    return (
        <StyleRoot>
            {
                <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                    <OrderComponent
                        setLogged={props.setLogged}
                        orderId={props.orderId !== undefined ? props.orderId : props.match.params.orderId}
                    />
                </div>
            }
        </StyleRoot>

    )
}
