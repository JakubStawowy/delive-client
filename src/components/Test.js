import {useSpring, animated} from 'react-spring'
import {useState} from "react";
import {BounceLoader} from "react-spinners";

export const Test = () => {


    const [faded, setFaded] = useState(false);

    const styles = useSpring({
        // loop: true,
        to: { opacity: faded ? 1 : 0},
        from: { opacity: 0},
    });

    return (
        <div>
            {/*<Button variant={'contained'} onClick={()=>setFaded(!faded)}>*/}
            {/*    Fade*/}
            {/*</Button>*/}
            {/*<animated.div style={styles}>*/}
            {/*    <Button variant={'contained'} onClick={()=>setFaded(!faded)}>*/}
            {/*        Faded*/}
            {/*    </Button>*/}
            {/*</animated.div>*/}
            <BounceLoader
                loading
                color={'red'}
            />
        </div>
    )
}
