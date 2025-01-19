import { useState } from 'react';
import { Burger, Popover } from '@mantine/core';
import RaceSubmissionForm from '../Submit';

export default function HamburgerNav() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Popover position="bottom">
        <Popover.Target>
          <Burger opened={opened} onClick={() => setOpened((o) => !o)} />
        </Popover.Target>
        <Popover.Dropdown>
        <RaceSubmissionForm />
        </Popover.Dropdown>
      </Popover>
    </>
  );
}