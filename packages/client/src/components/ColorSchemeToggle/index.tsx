'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import classes from './color-scheme-toggle.module.css';
import { LIGHT_COLOR_SCHEME, DARK_COLOR_SCHEME } from '../../constants';

export const COLOR_SCHEME_TOGGLE_TEST_ID = 'color-scheme-toggle';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <div className={classes.colorScheme} data-testid={COLOR_SCHEME_TOGGLE_TEST_ID}>
      <Group justify="center">
        <Button
          size="compact-sm"
          variant="transparent"
          onClick={() => setColorScheme(LIGHT_COLOR_SCHEME)}
        >
          Light Theme
        </Button>
        <Button
          size="compact-sm"
          variant="transparent"
          onClick={() => setColorScheme(DARK_COLOR_SCHEME)}
        >
          Dark Theme
        </Button>
      </Group>
    </div>
  );
}