import {Card, Typography} from "@material-ui/core";
import {flexComponents, paddingComponents, sizeComponents} from "../style/components";

export const ErrorPage = (props) => {

    const paddingClasses = paddingComponents();
    const flexClasses = flexComponents();
    const sizeClasses = sizeComponents();

    return (<div className={`${flexClasses.flexRowCenter} ${sizeClasses.bodyHeight}`}>
        <Typography>
            <Card className={paddingClasses.paddingMedium}>
                Error {props.match.params.code}
            </Card>
        </Typography>
    </div>)
}
