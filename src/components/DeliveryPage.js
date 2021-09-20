
import {
    Button,
    Card,
    Fab,
    makeStyles, Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Tabs
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {flexComponents, rwdComponents, sizeComponents} from "../style/components";
import {loadDeliveriesByDeliverer, loadDeliveriesByPrincipal} from "../actions/restActions";
import {USER_ID} from "../consts/ApplicationConsts";
import {handleError} from "../actions/handlers";
import {trimDate} from "../actions/functions";
import {DeliveryTableRow} from "./DeliveryTableRow";
import {useHistory} from "react-router";

export const DeliveryPage = (props) => {

    const [deliveries, setDeliveries] = useState([]);
    const [deliveryFlag, setDeliveryFlag] = useState(true);
    const [userDeliveries, setUserDeliveries] = useState([]);
    const history = useHistory();
    const useClasses = makeStyles((theme) => ({
        tableHead: {
            background: '#4BBEBAE0',
        },
        container: {
            marginTop: '2em',
            width: '60vw',
            [theme.breakpoints.down('xs')]: {
                width: '100%'
            }
        },
        check: {
            color: "green"
        },
        clear: {
            color: "red"
        },
        table: {
            // height: "10vh"
        },
        rented: {
            background: "#FFD700"
        },
        returned: {
            background: "#32CD32"
        }
    }));
    const classes = useClasses();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();

    useEffect(()=>{
        loadDeliveries();
    }, []);

    const loadDeliveries = () => {

        loadDeliveriesByDeliverer(localStorage.getItem(USER_ID))
            .then(response => setUserDeliveries(response.data))
            .catch(error => handleError(error, history));

        loadDeliveriesByPrincipal(localStorage.getItem(USER_ID))
            .then(response => setDeliveries(response.data))
            .catch(error => handleError(error, history));
    }

    const refresh = () => {
        setUserDeliveries([]);
        setDeliveries([]);
        loadDeliveries();
    }

    return (
        <div className={flexClasses.flexColumnSpaceAround}>
            <Tabs>
                <Button variant={"contained"} onClick={()=>setDeliveryFlag(true)}>
                    User
                </Button>
                <Button variant={"contained"} onClick={()=>setDeliveryFlag(false)}>
                    Realized by user
                </Button>
            </Tabs>
            <TableContainer component={Card} className={`${classes.container}`}>
                <Table className={classes.table}>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            <TableCell align={"center"}>announcement</TableCell>
                            <TableCell align={"center"}>registered at</TableCell>
                            <TableCell align={"center"}>packages</TableCell>
                            <TableCell align={"center"}>from</TableCell>
                            <TableCell align={"center"}>to</TableCell>
                            <TableCell align={"center"}>state</TableCell>
                            <TableCell align={"center"}>action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            deliveryFlag ?
                                userDeliveries.map(delivery => {
                                    return (
                                        <DeliveryTableRow
                                            delivery={delivery}
                                            refresh={refresh}
                                        />
                                    );
                                })
                                :
                                deliveries.map(delivery => {
                                    return (
                                        <DeliveryTableRow
                                            delivery={delivery}
                                            refresh={refresh}
                                        />
                                    );
                                })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
