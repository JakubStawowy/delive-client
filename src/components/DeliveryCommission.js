import {CommissionForm} from "./CommissionForm";

export const DeliveryCommission = (props) => {
    return (
        <CommissionForm delivery={true} params={props.match.params}/>
    )
}
