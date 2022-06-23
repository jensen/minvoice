import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import cx from "classnames";

type NotificationType = "info" | "warning" | "error";

interface INotification {
  id: number;
  type: NotificationType;
  content: string;
}

interface INotificationContext {
  addNotification: (type: NotificationType, content: string) => void;
}

const NotificationContext = createContext<INotificationContext>({
  addNotification: (type: NotificationType, content: string) => null,
});

interface INotificationProps extends INotification {
  remove: (id: number) => void;
}

const Notification = (props: INotificationProps) => {
  const { id, remove } = props;

  useEffect(() => {
    const timeout = setTimeout(() => remove(id), 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [id, remove]);

  return (
    <li
      className={cx("notifications__item", {
        "notifications__item--info": props.type === "info",
        "notifications__item--warning": props.type === "warning",
        "notifications__item--error": props.type === "error",
      })}
    >
      {props.content}
    </li>
  );
};

interface INotificationsProps {
  notifications: INotification[];
  remove: (id: number) => void;
}

const Notifications = (props: INotificationsProps) => {
  return (
    <section className="notifications__container">
      <ul className="notifications__list">
        {props.notifications.map((notification) => (
          <Notification
            key={notification.id}
            {...notification}
            remove={props.remove}
          />
        ))}
      </ul>
    </section>
  );
};

interface INotificationProviderProps extends React.PropsWithChildren {}

export default function NotificationProvider(
  props: INotificationProviderProps
) {
  const lastId = useRef(0);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const addNotification = (type: NotificationType, content: string) => {
    const nextId = lastId.current + 1;

    setNotifications((notifications) => [
      ...notifications,
      { id: nextId, type, content },
    ]);

    lastId.current = nextId;
  };

  const removeNotification = useCallback(
    (id: number) =>
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.id !== id)
      ),
    []
  );

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {props.children}
      <Notifications
        notifications={notifications}
        remove={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  return useContext(NotificationContext);
};
