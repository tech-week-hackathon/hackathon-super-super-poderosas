import { Button, Card } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Modal } from "./Modal";
import { miniGovsInfo } from "@/utils/types";

export const MiniGobCard = ({ miniGob }: { miniGob: miniGovsInfo }) => {
  const router = useRouter();
  return (
    <Card.Root>
      <Card.Body display="flex" flexDirection="column" gap="2">
        <Card.Title mt="2">{miniGob.name}</Card.Title>
        <Card.Description>
          Members amount: {miniGob.users_amount}
          <br />
          Token: {miniGob.token}
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
              You will join {miniGob.name} with {miniGob.users_amount} members
              and&nbsp;
              {miniGob.token} as a token.
            </p>
          </Modal>
        </div>
      </Card.Body>
    </Card.Root>
  );
};
