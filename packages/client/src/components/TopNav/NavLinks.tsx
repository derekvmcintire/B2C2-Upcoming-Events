import { Anchor, Divider, Flex, Stack } from '@mantine/core';
import classes from './top-nav.module.css';

interface NavLinksProps {
  isVertical?: boolean;
}

const getNavLinks = ({ isVertical = false }: NavLinksProps) => {
  // Divider orientation is opposite of nav
  const dividerOrientation = isVertical ? 'horizontal' : 'vertical';
  return (
    <>
      <Anchor underline="never" className={classes.topNavAnchor} href="/">
        Home
      </Anchor>
      <Divider ml={8} mr={8} orientation={dividerOrientation} />
      <Anchor underline="never" className={classes.topNavAnchor} href="/road">
        Road
      </Anchor>
      <Divider ml={8} mr={8} size="sm" orientation={dividerOrientation} />
      <Anchor underline="never" className={classes.topNavAnchor} href="/cx">
        CX
      </Anchor>
      <Divider ml={8} mr={8} size="sm" orientation={dividerOrientation} />
      <Anchor underline="never" className={classes.topNavAnchor} href="/xc">
        XC
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