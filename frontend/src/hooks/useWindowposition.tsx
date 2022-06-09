import { useLayoutEffect, useState } from "react"

const useWindowPosition = (id:any) => {
    const [animation, setAnimation] = useState(false);

    useLayoutEffect(() => {
        const upadtePosition = () => {
            const offsetHeight = window.document.getElementById(id)?.offsetHeight;
            if (offsetHeight && (window.pageYOffset > offsetHeight * 0.4)) {
                setAnimation(true);
            } else {
                setAnimation(false);
            }
        }
        window.addEventListener("scroll", upadtePosition);
        upadtePosition();
        return () => {window.removeEventListener("scroll", upadtePosition)};
    }, [id])
    return animation;
}

export default useWindowPosition;