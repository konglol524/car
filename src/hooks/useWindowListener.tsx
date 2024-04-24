import { useEffect, useState } from "react";

export function useWindowListener(eventType:string, listener: EventListener ) {
        // const [winwidth, setWinWidth] = useState(0);
        useEffect(()=>{
            //  const handleWinWidthChange = ()=>{
            //      setWinWidth(window.innerWidth);
            //      alert('window width' + window.innerWidth);
            //  }
            // window.addEventListener("resize", handleWinWidthChange);

            window.addEventListener(eventType, listener);

            return ()=>{
                 window.removeEventListener(eventType, listener);
            }

         }, [eventType, listener]);
}