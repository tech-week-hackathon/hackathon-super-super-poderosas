import AbstainIcon from "@/public/abstain.svg";
import NoIcon from "@/public/no.svg";
import YesIcon from "@/public/yes.svg";
import { Button, Card, Flex, Heading, Separator } from "@chakra-ui/react";
import { Lucid } from "lucid-txpipe";
import Image from "next/image";
import { useState } from "react";

export const Action = ({ lucid, action }: { lucid: Lucid | undefined, action: string }) => {
  const [yes, setYes] = useState(0);
  const [no, setNo] = useState(0);
  const [abstain, setAbstain] = useState(0);
  const [voted, setVoted] = useState(false);

  const vote = (choice: string) => {
    if (lucid) {
      console.log("Voting ", choice)
      // agregar call a al función
    }
  };

  return (
    <Card.Root>
      <Card.Header gap={{ base: "2", md: "5" }}>
        <Card.Title mt="2" mx="auto">
          {action}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Flex
          justify={{ base: "center", md: "space-between" }}
          direction={{ base: "column", md: "row" }}
          gap="3"
        >
          <Flex align="center">
            <Image src={YesIcon} alt="Yes" />
            <span>&nbsp;{yes}</span>
          </Flex>
          <Flex align="center">
            <Image src={NoIcon} alt="No" />
            <span>&nbsp;{no}</span>
          </Flex>
          <Flex align="center">
            <Image src={AbstainIcon} alt="Abstain" />
            <span>&nbsp;{abstain}</span>
          </Flex>
        </Flex>

        <Separator width="full" my={3} />

        <Heading size="md" mb={3} textAlign={{ base: "center", md: "left" }}>
          Vote!
        </Heading>

        <Flex
          justify={{ base: "center", md: "space-between" }}
          gap="3"
          wrap="wrap"
        >
          <Button
            disabled={voted}
            variant="outline"
            onClick={() => {
              if (!voted) setYes((prev) => prev + 1);
              setVoted(true);
            }}
          >
            <Image src={YesIcon} alt="Yes" />
            <span>Yes</span>
          </Button>
          <Button
            disabled={voted}
            variant="outline"
            onClick={() => {
              if (!voted) setNo((prev) => prev + 1);
              setVoted(true);
            }}
          >
            <Image src={NoIcon} alt="No" />
            <span>No</span>
          </Button>
          <Button
            disabled={voted}
            variant="outline"
            onClick={() => {
              if (!voted) setAbstain((prev) => prev + 1);
              setVoted(true);
            }}
          >
            <Image src={AbstainIcon} alt="Abstain" />
            <span>Abstain</span>
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};
