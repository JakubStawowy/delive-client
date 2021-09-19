import {CommissionForm} from "./CommissionForm";

export const NormalCommission = (props) => {
    return (
        <CommissionForm delivery={false} params={props.match.params} />
    )
}
