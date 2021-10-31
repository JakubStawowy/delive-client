import {Card, makeStyles} from "@material-ui/core";
import {flexComponents, paddingComponents} from "../style/components";
import {useEffect, useState} from "react";
import {getReverseGeocode} from "../rest/restActions";
import {handleError} from "../actions/handlers";
import {useHistory} from "react-router";
import {BounceLoader} from "react-spinners";

export const LocationDetails = props => {

    const [data, setData] = useState(null);
    const history = useHistory();
    const [keys, setKeys] = useState([]);

    const paddingClasses = paddingComponents();
    const flexClasses = flexComponents();
    const useClasses = makeStyles((() => ({
        button: {
            width: '100%',
            borderRadius: 0
        },
        card: {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0
        },
        pin: {
            color: "green"
        }
    })));
    const classes = useClasses();

    useEffect(() => {
        getReverseGeocode(props.longitude, props.latitude)
            .then(response => {
                setData(response.data);
                let kys = [];
                for (let key in response.data) {
                    kys.push(key);
                }
                setKeys(kys)
            })
            .catch(error => handleError(error, history));
    }, []);

    return (
            <Card className={`${paddingClasses.paddingMedium} ${flexClasses.flexColumnSpaceAround} ${classes.card}`}>
                {
                    data === null && keys.length === 0 ?
                        <BounceLoader
                            loading
                            color={'red'}
                        />
                    :
                        <div>
                            {
                                keys.map(key => {
                                    return (
                                        <div className={flexClasses.flexRowSpaceBetween}>
                                            <div>
                                                {key}:
                                            </div>
                                            <div>
                                                {data[key]}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </Card>
    )
}
