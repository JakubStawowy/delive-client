import {OrderForm} from "../components/OrderForm";

export const EditOrderPage = (props) => {
    return (
        <OrderForm
            orderId={props.match.params.orderId}
            edit={true}
            setLogged={props.setLogged}
        />
    )
}
