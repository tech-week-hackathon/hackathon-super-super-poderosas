import { Action } from "@/components/Action";
import { Gob } from "@/components/MiniGobsTable";
import { Box, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

const gob: Gob = {
  name: "a",
  members: [{ name: "asd", ada: 12 }],
  ada: 123,
};
const actions = ["Action A", "Action B", "Action B"];

export default function Org() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      minHeight="100vh"
      gap={5}
      py={5}
      fontFamily="var(--font-geist-sans)"
    >
      <Head>
        {/* TODO: Change this */}
        <title>Organization-{id}</title>
      </Head>
      <Heading size={"5xl"}>{gob.name.toUpperCase()}</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {actions.map((action, index) => (
          <Action key={index} action={action} />
        ))}
      </Grid>
    </Box>
  );
}
