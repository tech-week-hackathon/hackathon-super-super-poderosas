import { Button, Card } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Gob } from "./MiniGobsTable";
import { Modal } from "./Modal";

export const MiniGobCard = ({ miniGob }: { miniGob: Gob }) => {
  const router = useRouter();
  return (
    <Card.Root>
      <Card.Body display="flex" flexDirection="column" gap="2">
        <Card.Title mt="2">{miniGob.name}</Card.Title>
        <Card.Description>
          Members amount: {miniGob.members.length}
          <br />
          ADA amount: {miniGob.ada}
        </Card.Description>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "auto",
          }}
        >
          <Modal
            title="Are you sure?"
            confirmText="Sure"
            onClickFn={() => {
              router.push(`/org/${miniGob.name}`);
            }}
            start={
              <Button
                size="sm"
                onClick={() => {
                  router.push(`/org/${miniGob.name}`);
                }}
              >
                Join
              </Button>
            }
            error=""
          >
            <p>
              You will join {miniGob.name} with {miniGob.members.length} members
              and&nbsp;
              {miniGob.ada} ADA.
            </p>
          </Modal>
        </div>
      </Card.Body>
    </Card.Root>
  );
};
