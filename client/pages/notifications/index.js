import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Notifications from "../../components/Notifications";
import MainLayout from "../../layouts/Main";
import { notifCount } from "../../features/user";
function notification() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notifCount());
  }, []);
  return <Notifications />;
}

notification.PageLayout = MainLayout;

export default notification;
