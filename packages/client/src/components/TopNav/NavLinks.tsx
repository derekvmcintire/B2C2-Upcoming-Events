import { Anchor, Button, Divider, Flex, Stack } from '@mantine/core';
import classes from './top-nav.module.css';

interface NavLinksProps {
  isVertical?: boolean;
}

const getNavButton = (text: string) => {
  return (
    <Button
      c="#FFF"
      size="md"
      variant="subtle"
      justify="space-between"
      leftSection={text}
      rightSection={<span />}
    />
  );
};

const getNavLinks = ({ isVertical = false }: NavLinksProps) => {
  // Divider orientation is opposite of nav
  const dividerOrientation = isVertical ? 'horizontal' : 'vertical';
  return (
    <>
      <Anchor underline="never" className={classes.topNavAnchor} href="/">
        {getNavButton('Home')}
      </Anchor>
      <Divider ml={8} mr={8} orientation={dividerOrientation} />
      <Anchor underline="never" className={classes.topNavAnchor} href="/road">
        {getNavButton('Road')}
      </Anchor>
      <Divider ml={8} mr={8} size="sm" orientation={dividerOrientation} />
      <Anchor underline="never" className={classes.topNavAnchor} href="/cx">
        {getNavButton('CX')}
      </Anchor>
      <Divider ml={8} mr={8} size="sm" orientation={dividerOrientation} />
      <Anchor underline="never" className={classes.topNavAnchor} href="/xc">
        {getNavButton('XC')}
      </Anchor>
    </>
  );
};

export default function NavLinks({ isVertical = false }: NavLinksProps) {
  return isVertical ? (
    <Stack>{getNavLinks({ isVertical })}</Stack>
  ) : (
    <Flex mr={20}>{getNavLinks({ isVertical })}</Flex>
  );
}