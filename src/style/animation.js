import Radium from "radium";

export const useAnimationStyles = (animationName, time) => {
    return {
        animation: {
            animation: `${time}ms`,
            animationName: Radium.keyframes(animationName, 'animation')
        }
    }
}
