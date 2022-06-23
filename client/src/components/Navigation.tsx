import { useMatch, Link } from "react-router-dom";
import cx from "classnames";
import type { IIcon } from "../components/shared/Icons";
import {
  Clock,
  FileInvoiceDollar,
  FileChartColumn,
  Table,
  Gear,
} from "../components/shared/Icons";

import "./navigation.css";

const routes = [
  { id: "summary", path: "/", label: "Summary", icon: Table },
  { id: "time", path: "/time", label: "Time", icon: Clock },
  { id: "reports", path: "/reports", label: "Reports", icon: FileChartColumn },
  {
    id: "invoices",
    path: "/invoices",
    label: "Invoices",
    icon: FileInvoiceDollar,
  },
  { id: "settings", path: "/settings", label: "Settings", icon: Gear },
] as const;

type RoutePath = typeof routes[number]["path"];

interface INavigationItemProps extends Omit<INavigationLinkProps, "path"> {
  active: boolean;
}

const NavigationItem = (props: INavigationItemProps) => {
  const Icon = props.icon;

  return (
    <li
      className={cx("navigation__item", {
        "navigation__item--active": props.active,
      })}
    >
      <span className="navigation__tab">&nbsp;</span>
      <span className="navigation__icon">
        <Icon size={24} />
      </span>
      <span className="navigation__label">{props.label}</span>
    </li>
  );
};

interface INavigationLinkProps {
  path: RoutePath;
  label: string;
  icon: IIcon;
}

const NavigationLink = (props: INavigationLinkProps) => {
  const isActive = useMatch(`${props.path}/*`) !== null;

  return (
    <Link to={props.path}>
      <NavigationItem label={props.label} active={isActive} icon={props.icon} />
    </Link>
  );
};

export default function Navigation() {
  return (
    <ul className="navigation__list">
      {routes.map((route) => {
        return (
          <NavigationLink
            key={route.id}
            path={route.path}
            label={route.label}
            icon={route.icon}
          />
        );
      })}
    </ul>
  );
}
