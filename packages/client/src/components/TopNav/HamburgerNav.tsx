import { useState } from "react";
import { Burger, Popover } from "@mantine/core";
import Nav from "./NavBar";
import classes from "./top-nav.module.css";

/**
 * HamburgerNav Component
 *
 * A mobile navigation menu that opens and closes when the hamburger icon is clicked.
 * Displays the navigation items vertically within a popover when opened.
 */
export default function HamburgerNav(): JSX.Element {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Popover position="bottom">
        <Popover.Target>
          <Burger
            className={classes.burgerPopover}
            opened={opened}
            onClick={() => setOpened((o) => !o)}
          />
        </Popover.Target>
        <Popover.Dropdown>
          <Nav vertical />
        </Popover.Dropdown>
      </Popover>
    </>
  );
}
