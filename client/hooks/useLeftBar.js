import { useEffect, useState } from "react";

function useLeftBar(props) {
  const [leftBar, setLeftBar] = useState(false);
  const changeStatus = () => {
    setLeftBar(!leftBar);
  };
  return [leftBar, changeStatus];
}

export default useLeftBar;
