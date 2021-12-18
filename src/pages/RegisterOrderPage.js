import {OrderForm} from "../components/OrderForm";

export const RegisterOrderPage = props => {
    return (
        <OrderForm
            edit={false}
            setLogged={props.setLogged}
        />
    )
}
