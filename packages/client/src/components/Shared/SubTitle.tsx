import { Divider, Stack, Text } from "@mantine/core";
import classes from "./shared.module.css";

interface SubTitleProps {
  text: string;
  ta?: "left" | "center" | "right";
  w?: string;
}

export default function SubTitle({ text, ta = "left", w = "" }: SubTitleProps) {
  return (
    <Stack gap={0}>
      <Text ta={ta} w={w} className={classes.subTitle}>
        {text}
      </Text>
      <Divider color="#607d8b" />
    </Stack>
  );
}
