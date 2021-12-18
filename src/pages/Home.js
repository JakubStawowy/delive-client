import {Button, Card, List, ListItem, makeStyles, Typography} from "@material-ui/core";
import {flexComponents, listComponents, paddingComponents, rwdComponents, sizeComponents} from "../style/components";
import {OrderListItem} from "../components/OrderListItem";
import {useEffect, useState} from "react";
import {BounceLoader} from "react-spinners";
import {StyleRoot} from "radium";
import {fadeInDown, fadeIn, fadeOutLeft} from "react-animations";
import {useAnimationStyles} from "../style/animation";
import {ANIMATION_TIME} from "../data/consts";
import {handleError, handleItemAccessAttempt} from "../actions/handlers";
import {useHistory} from "react-router";
import {getFilteredOrders, getOrders} from "../rest/restActions";
import LoopIcon from "@material-ui/icons/Loop";
import TuneIcon from '@material-ui/icons/Tune';
import {FilteringPanel} from "../components/FilteringPanel";

export const Home = (props) => {

    const [orders, setOrders] = useState([]);
    const [filteringPanelOpened, setFilteringPanelOpened] = useState(false);

    const [addressFrom, setAddressFrom] = useState('');
    const [addressTo, setAddressTo] = useState('');
    const [minimalSalary, setMinimalSalary] = useState('');
    const [maxWeight, setMaxWeight] = useState('');
    const [requireNoClientTransport, setRequireNoClientTransport] = useState(false);
    const [sortBySalary, setSortBySalary] = useState(false);
    const [sortByWeight, setSortByWeight] = useState(false);

    const [bounce, setBounce] = useState(false);

    const history = useHistory();

    const useStyles = makeStyles((()=>({
        selected: {
            background: '#DCDCDC'
        },
    })));
    const classes = useStyles();
    const flexClasses = flexComponents();
    const paddingClasses = paddingComponents();
    const sizeClasses = sizeComponents();
    const listClasses = listComponents();
    const rwdClasses = rwdComponents();
    const animationStyles = useAnimationStyles(fadeInDown, ANIMATION_TIME);
    const loaderAnimationStyles = useAnimationStyles(fadeIn, ANIMATION_TIME);
    const fadeOutStyles = useAnimationStyles(fadeOutLeft, ANIMATION_TIME / 2);

    useEffect(()=>{
        handleItemAccessAttempt(history);
        loadOrders();
    }, []);

    const loadOrders = () => {
        getOrders().then(response => setOrders(response.data))
            .catch((error) => handleError(error, history, props.setLogged));
    }

    const filterOrders = (addressFrom, addressTo, minimalSalary, maxWeight, requireNoClientTransport, sortBySalary, sortByWeight) => {
        getFilteredOrders(addressFrom, addressTo, minimalSalary, maxWeight,
            requireNoClientTransport === true ? 'false' : '', sortBySalary, sortByWeight)
            .then(response => setOrders(response.data))
            .catch((error) => handleError(error, history, props.setLogged));
    }

    const navToCommissionForm = type => {
        setBounce(true);
        setTimeout(() => history.push('/commission/' + type), ANIMATION_TIME / 2);
    }

    const refresh = () => {
        setOrders([]);
        loadOrders();
    }

    return (
        <StyleRoot>
            <div className={`${flexClasses.flexRowSpaceAround} ${sizeClasses.bodyHeight}`}>
                {
                    orders === null ?
                        <div style={loaderAnimationStyles.animation}>
                            <BounceLoader
                                loading
                                color={'red'}
                            />
                        </div>
                        :
                        <div style={bounce ? fadeOutStyles.animation : animationStyles.animation} className={`${rwdClasses.mobileCard}`}>
                            <Card className={`${paddingClasses.paddingMedium} ${sizeClasses.componentHeight} ${flexClasses.flexColumnSpaceBetween}`}>
                                <div className={`${flexClasses.flexRowCenter}`}>
                                    <Button onClick={() => refresh()}>
                                        <LoopIcon />
                                    </Button>
                                    <Button
                                        onClick={() => setFilteringPanelOpened(!filteringPanelOpened)}
                                        className={`${filteringPanelOpened && classes.selected}`}
                                    >
                                        <TuneIcon />
                                    </Button>
                                </div>
                                {
                                    filteringPanelOpened &&
                                        <FilteringPanel
                                            addressFrom={addressFrom}
                                            setAddressFrom={setAddressFrom}
                                            addressTo={addressTo}
                                            setAddressTo={setAddressTo}
                                            minimalSalary={minimalSalary}
                                            setMinimalSalary={setMinimalSalary}
                                            maxWeight={maxWeight}
                                            setMaxWeight={setMaxWeight}
                                            requireNoClientTransport={requireNoClientTransport}
                                            setRequireNoClientTransport={setRequireNoClientTransport}
                                            filterOrders={filterOrders}
                                            sortBySalary={sortBySalary}
                                            setSortBySalary={setSortBySalary}
                                            sortByWeight={sortByWeight}
                                            setSortByWeight={setSortByWeight}
                                        />
                                }
                                <List className={`${listClasses.verticalList}`}>
                                    {
                                        orders.length > 0 ?
                                        orders.map(order=>{
                                            return (
                                                <ListItem>
                                                    <OrderListItem
                                                        data={order}
                                                        action={navToCommissionForm}
                                                        delivery={false}
                                                    />
                                                </ListItem>
                                            )
                                        })
                                            :
                                            <div>
                                                No Orders yet
                                            </div>
                                    }
                                </List>
                            </Card>
                        </div>
                }
            </div>
        </StyleRoot>
    )
}
