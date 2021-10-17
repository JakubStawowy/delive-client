import {CommissionForm} from "../components/CommissionForm";

export const NormalCommission = (props) => {
    return (
        <CommissionForm delivery={false} params={props.match.params} />
    )
}
