import {AnnouncementForm} from "../components/AnnouncementForm";

export const EditAnnouncement = (props) => {
    return (
        <AnnouncementForm
            announcementId={props.match.params.announcementId}
            edit={true}
            setLogged={props.setLogged}
        />
    )
}
