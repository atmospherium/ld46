import { useEffect } from "react";
const useScrollToBottom = (elementListener) => {
  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight || document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [elementListener]);
};

export default useScrollToBottom;
