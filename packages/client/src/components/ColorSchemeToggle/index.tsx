import { Button, Group, useMantineColorScheme } from '@mantine/core';
import classes from './color-scheme-toggle.module.css';
import { LIGHT_COLOR_SCHEME, DARK_COLOR_SCHEME } from '../../constants';

/**
 * ColorSchemeToggle Component
 * 
 * A button group that allows the user to toggle between light and dark themes. 
 * It uses Mantine's `useMantineColorScheme` hook to set the color scheme 
 * based on the user's selection.
 * 
 * The component renders two buttons:
 * - One to switch to the light theme.
 * - One to switch to the dark theme.
 * 
 */
function ColorSchemeToggle(): JSX.Element {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <div className={classes.colorScheme}>
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

export default ColorSchemeToggle;