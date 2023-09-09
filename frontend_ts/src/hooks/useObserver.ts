import { useEffect, useRef } from "react";

export const useObserver = (ref: any, canLoad: boolean, callback: any, isLoading: boolean) => {
  const observer: any = useRef();

  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    var cb = function (entries: any[]) {
      if (entries[0].isIntersecting && canLoad) {
        callback();
        console.log('div here')
      }
    };
    observer.current = new IntersectionObserver(cb);
    observer.current.observe(ref.current);
  }, [isLoading]);
};
