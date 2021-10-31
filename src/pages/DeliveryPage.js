
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
import {flexComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {loadDeliveriesByDeliverer, loadDeliveriesByPrincipal} from "../rest/restActions";
// import {USER_ID} from "../consts/applicationConsts";
import {handleError} from "../actions/handlers";
import {DeliveryTableRow} from "../components/DeliveryTableRow";
import {useHistory} from "react-router";
import LoopIcon from "@material-ui/icons/Loop";
import {BounceLoader} from "react-spinners";

export const DeliveryPage = (props) => {

    const [deliveries, setDeliveries] = useState(null);
    const [userDeliveries, setUserDeliveries] = useState(null);
    const [deliveryFlag, setDeliveryFlag] = useState(true);
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
            // height: "70vh"
        },
        rented: {
            background: "#FFD700"
        },
        returned: {
            background: "#32CD32"
        },
        selected: {
            background: '#DCDCDC'
        },
    }));
    const classes = useClasses();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();
    const paddingClasses = paddingComponents();

    useEffect(()=>{
        loadDeliveries();
    }, []);

    const loadDeliveries = () => {
        loadDeliveriesByDeliverer()
            .then(response => setDeliveries(response.data))
            .catch(error => handleError(error, history));

        loadDeliveriesByPrincipal()
            .then(response => setUserDeliveries(response.data))
            .catch(error => handleError(error, history));
    }

    const refresh = () => {
        setUserDeliveries(null);
        setDeliveries(null);
        loadDeliveries();
    }

    return (
        <div className={`${flexClasses.flexColumnSpaceAround} ${rwdClasses.mobileCard}`}>
            <Card className={`${paddingClasses.paddingMedium} ${sizeClasses.componentHeight}`}>
                <Tabs className={flexClasses.flexColumnSpaceAround}>
                    <Button onClick={()=>setDeliveryFlag(true)} className={deliveryFlag && classes.selected}>
                        User
                    </Button>
                    <Button onClick={()=>setDeliveryFlag(false)} className={!deliveryFlag && classes.selected}>
                        Realized by user
                    </Button>
                    <Button onClick={() => refresh()}>
                        <LoopIcon />
                    </Button>
                </Tabs>
                {
                    deliveries === null || userDeliveries === null ?
                        <BounceLoader
                            loading
                            color={'red'}
                        />
                        :
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
                }
            </Card>
        </div>
    )
}
