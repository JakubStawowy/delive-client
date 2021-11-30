import {Card, Checkbox, FormControlLabel, makeStyles, TextField} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import {useState} from "react";

export const FilteringPanel = props => {

    const useClasses = makeStyles((()=>({
        root: {
            overflow: 'visible',
            alignItems: 'flex-start',
            width: '90%'
        },
        address: {
            width: '100%'
        },
        smallFilter: {
            width: '45%'
        }
    })));
    const classes = useClasses();
    const paddingClasses = paddingComponents();
    const flexClasses = flexComponents();

    const changeAddressFrom = value => {
        props.setAddressFrom(value);
        props.filterAnnouncements(value, props.addressTo, props.minimalSalary, props.maxWeight, props.requireNoClientTransport);
    }

    const changeAddressTo = value => {
        props.setAddressTo(value);
        props.filterAnnouncements(props.addressFrom, value, props.minimalSalary, props.maxWeight, props.requireNoClientTransport);
    }

    const changeMinimalSalary = value => {
        props.setMinimalSalary(value);
        props.filterAnnouncements(props.addressFrom, props.addressTo, value, props.maxWeight, props.requireNoClientTransport);
    }

    const changeMaxWeight = value => {
        props.setMaxWeight(value);
        props.filterAnnouncements(props.addressFrom, props.addressTo, props.minimalSalary, value, props.requireNoClientTransport);
    }

    const changeTransportRequirement = value => {
        props.setRequireNoClientTransport(value);
        props.filterAnnouncements(props.addressFrom, props.addressTo, props.minimalSalary, props.maxWeight, value);
    }

    return (
        <div className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceBetween} ${classes.root}`}>
            <TextField
                value={props.addressFrom}
                onChange={e => changeAddressFrom(e.target.value)}
                label={"Start addresss"}
                className={`${classes.address}`}/>
            <TextField
                value={props.addressTo}
                onChange={e => changeAddressTo(e.target.value)}
                label={"Final addresss"}
                className={`${classes.address}`}/>
            <div className={flexClasses.flexRowSpaceBetween}>
                <TextField
                    value={props.minimalSalary}
                    onChange={e => changeMinimalSalary(e.target.value)}
                    label={"Minimal salary"}
                    className={classes.smallFilter}
                />
                <TextField
                    value={props.maxWeight}
                    onChange={e => changeMaxWeight(e.target.value)}
                    label={"Max weight"}
                    className={classes.smallFilter}
                />
            </div>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.requireNoClientTransport}
                        color={"secondary"}
                        onChange={() => changeTransportRequirement(!props.requireNoClientTransport)}
                    />
                }
                label={'Show announcements without client transport requirement'}
            />
        </div>
    )
}
