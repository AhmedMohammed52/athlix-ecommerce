import notifications from "../../../data/notifications";
import NotificationItem from "./NotificationItem";

export default function NotificationList() {
  return (
    <>
      {notifications.map((item) => (
        <NotificationItem item={item} key={item.id} />
      ))}
    </>
  );
}
