import { useState } from 'react';
import { Burger, Popover, ScrollArea } from '@mantine/core';
import NavLinks from './NavLinks';

export default function HamburgerNav() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Popover position="bottom">
        <Popover.Target>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Popover.Target>
        <Popover.Dropdown>
          <ScrollArea w={200} scrollbars="y">
            <NavLinks isVertical />
          </ScrollArea>
        </Popover.Dropdown>
      </Popover>
    </>
  );
}