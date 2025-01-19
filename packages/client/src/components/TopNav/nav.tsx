import { Anchor, Flex, Stack } from "@mantine/core";
import classes from './top-nav.module.css';

type NavProps = {
  vertical?: boolean;
}

/**
 * Nav Component
 * 
 * A navigation component that renders links to the home page and the race submission page. 
 * It conditionally displays either a horizontal or vertical layout depending on the `vertical` prop.
 * 
 * @param {boolean} [vertical=false] - Whether the navigation should be displayed vertically or horizontally.
 */
export default function Nav({ vertical = false }: NavProps): JSX.Element {
  const HomeAnchor = ({ className }: {className: string }): JSX.Element => (<Anchor href="/" className={className}>Home</Anchor>);
  const SubmitAnchor = ({ className }: {className: string }): JSX.Element => (<Anchor href="/submit" className={className}>Submit</Anchor>);

  const HorizontalNav = (): JSX.Element => (
    <Flex justify="flex-start">
      <HomeAnchor className={classes.horizontalNavAnchor} />
      <SubmitAnchor className={classes.horizontalNavAnchor} />
    </Flex>
  )

  const VerticalNav = (): JSX.Element => (
    <Stack>
      <HomeAnchor className={classes.verticalNavAnchor} />
      <SubmitAnchor className={classes.verticalNavAnchor} />
    </Stack>
  )

    return (
        <>
        {vertical ? (<VerticalNav />) : (<HorizontalNav />)}
        </>
    )
}
