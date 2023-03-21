import classes from "./EventsNavigation.module.css";
import { NavLink } from "react-router-dom";

export function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to={"/events"}
              end
            >
              All Events
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              to={"/events/new"}
            >
              New Event
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
