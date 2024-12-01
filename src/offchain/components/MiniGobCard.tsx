import { Button, Card } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Gob } from "./MiniGobsTable";
import { Modal } from "./Modal";

export const MiniGobCard = ({ miniGob }: { miniGob: Gob }) => {
  const router = useRouter();
  return (
    <Card.Root>
      <Card.Body gap="2">
        <Card.Title mt="2">{miniGob.name}</Card.Title>
        <Card.Description>
          Members amount: {miniGob.members.length}
          <br />
          ADA amount: {miniGob.ada}
        </Card.Description>
      </Card.Body>
      <Modal
        title="Are you sure?"
        confirmText="Sure"
        start={
          <Button
            size="sm"
            w="1/4"
            ml="44"
            onClick={() => {
              router.push(`/org/${miniGob.name}`);
            }}
          >
            Join
          </Button>
        }
      >
        <p>
          You will join {miniGob.name} with {miniGob.members.length} members
          and&nbsp;
          {miniGob.ada} ADA.
        </p>
      </Modal>
    </Card.Root>
  );
};
