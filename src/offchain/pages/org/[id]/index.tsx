import { Action } from "@/components/Action";
import { Gob } from "@/components/MiniGobsTable";
import { Modal2 } from "@/components/Modal2";
import { Box, Button, Card, Flex, Grid, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const gob: Gob = {
  name: "a",
  members: [{ name: "asd", ada: 12 }],
  ada: 123,
};

interface BlockfrostRes {
  tx_hash: string;
  cert_index: number;
  governance_type: string;
}

export default function Org() {
  const router = useRouter();
  // TODO: get org info
  const { id } = router.query;
  const [bActions, setBActions] = useState<{ action: string; type: string }[]>(
    []
  );
  const [actions, setActions] = useState([]);

  const getBlockfrostActions = async () => {
    const url =
      "https://cardano-preprod.blockfrost.io/api/v0/governance/proposals";
    const a = process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID as string;
    const options = {
      method: "GET",
      headers: { Project_id: a },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setBActions(
        data.map((action: BlockfrostRes) => ({
          action: action.tx_hash,
          type: action.governance_type,
        }))
      );
    } catch (error) {
      console.error(error);
    }
    // TODO: get org action name and setActions
  };

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
      bg="gray.800"
    >
      <Head>
        <title>Organization-{id}</title>
      </Head>
      <Flex>
        <Heading size={"5xl"}>{gob.name.toUpperCase()}</Heading>
        <Modal2
          title={`Select a new action to add to ${id}`}
          error=""
          start={
            <Button variant="outline" onClick={getBlockfrostActions}>
              Add Action
            </Button>
          }
        >
          <div>
            <Grid templateColumns="repeat(2, 1fr)" gap="6">
              {bActions.map((action, index) => {
                return (
                  <Card.Root key={index}>
                    <Card.Header gap={{ base: "2", md: "5" }}>
                      <Card.Title mt="2" mx="auto">
                        {action.type}
                        <br />
                        <Link
                          href={
                            "https://preprod.cexplorer.io/tx/" +
                            action +
                            "/governance#data"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {action.action.slice(0, 6)}...
                          {action.action.slice(-4)}
                        </Link>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Flex
                        justify={{ base: "center", md: "space-between" }}
                        gap="3"
                        wrap="wrap"
                      >
                        <Button variant="outline" onClick={() => {}}>
                          Add
                        </Button>
                      </Flex>
                    </Card.Body>
                  </Card.Root>
                );
              })}
            </Grid>
          </div>
        </Modal2>
      </Flex>
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {actions.map((action, index) => (
          <Action key={index} action={action} />
        ))}
      </Grid>
    </Box>
  );
}
