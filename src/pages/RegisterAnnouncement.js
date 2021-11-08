import {AnnouncementForm} from "../components/AnnouncementForm";

export const RegisterAnnouncement = props => {
    return (
        <AnnouncementForm
            edit={false}
            setLogged={props.setLogged}
        />
    )
}
