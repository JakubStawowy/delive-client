
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
    TableRow, Tabs, List
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
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
            background: '#DCDCDC',
        },
        container: {
            borderRadius: 0,
            maxHeight: '50vh',
            overflow: 'auto'
        },
        check: {
            color: "green"
        },
        clear: {
            color: "red"
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
        tab: {
            borderRadius: 0
        },
        table: {
            maxHeight: '70vh',
            overflow: 'auto'
        },
        root: {
            maxWidth: '100vw',
            overflow: 'auto',
            [theme.breakpoints.up('md')]: {
                padding: '2em'
            }
        },
        hiddenColumn: {
            [theme.breakpoints.down('xs')]: {
                display: 'none'
            }
        }
    }));
    const classes = useClasses();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();
    const rwdClasses = rwdComponents();
    const paddingClasses = paddingComponents();
    const listClasses = listComponents();

    useEffect(()=>{
        loadDeliveries();
    }, []);

    const loadDeliveries = () => {
        loadDeliveriesByDeliverer()
            .then(response => setDeliveries(response.data))
            .catch(error => handleError(error, history, props.setLogged));

        loadDeliveriesByPrincipal()
            .then(response => setUserDeliveries(response.data))
            .catch(error => handleError(error, history, props.setLogged));
    }

    const refresh = () => {
        setUserDeliveries(null);
        setDeliveries(null);
        loadDeliveries();
    }

    return (
        <div className={`${flexClasses.flexColumnCenter} ${sizeClasses.bodyHeight}`}>
            <Card className={`${rwdClasses.mobileCard} ${classes.root}`}>
                <div className={`${sizeClasses.fullWidth}`}>
                    <Button
                        onClick={()=>setDeliveryFlag(true)}
                        className={`${deliveryFlag && classes.selected} ${classes.tab}`}>
                        User
                    </Button>
                    <Button
                        onClick={()=>setDeliveryFlag(false)}
                        className={`${!deliveryFlag && classes.selected} ${classes.tab}`}>
                        Realized by user
                    </Button>
                    <Button
                        onClick={() => refresh()}>
                        <LoopIcon />
                    </Button>
                </div>
                {
                    deliveries === null || userDeliveries === null ?
                        <BounceLoader
                            loading
                            color={'red'}
                        />
                        :
                        <TableContainer component={Card} className={`${classes.container}`}>
                            <Table stickyHeader>
                                <TableHead className={classes.tableHead}>
                                    <TableRow>
                                        <TableCell align={"center"}>announcement</TableCell>
                                        <TableCell align={"center"}>registered at</TableCell>
                                        <TableCell className={classes.hiddenColumn} align={"center"}>packages</TableCell>
                                        <TableCell className={classes.hiddenColumn} align={"center"}>from</TableCell>
                                        <TableCell className={classes.hiddenColumn} align={"center"}>to</TableCell>
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
                                                        setLogged={props.setLogged}
                                                    />
                                                );
                                            })
                                            :
                                            deliveries.map(delivery => {
                                                return (
                                                    <DeliveryTableRow
                                                        delivery={delivery}
                                                        refresh={refresh}
                                                        setLogged={props.setLogged}
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
