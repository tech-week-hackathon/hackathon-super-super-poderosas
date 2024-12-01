import { Gob, MiniGobsTable } from "@/components/MiniGobsTable";
import { Box, Heading } from "@chakra-ui/react";
// import "@meshsdk/react/styles.css";
import Head from "next/head";

const miniGovs: Gob[] = [
  {
    name: "a",
    members: [{ name: "asd", ada: 12 }],
    ada: 123,
  },
  {
    name: "b",
    members: [{ name: "asd", ada: 12123 }],
    ada: 7890,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
  {
    name: "b",
    members: [{ name: "asd", ada: 12123 }],
    ada: 7890,
  },
  {
    name: "b",
    members: [{ name: "asd", ada: 12123 }],
    ada: 7890,
  },
  {
    name: "b",
    members: [{ name: "asd", ada: 12123 }],
    ada: 7890,
  },
  {
    name: "b",
    members: [{ name: "asd", ada: 12123 }],
    ada: 7890,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
  {
    name: "c",
    members: [{ name: "asd", ada: 102 }],
    ada: 321,
  },
];

export default function Home() {
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
        <title>Organizations</title>
      </Head>
      <Heading size="4xl" p="4">
        Organizations to Join!
      </Heading>
      <MiniGobsTable miniGobs={miniGovs} />
    </Box>
  );
}
