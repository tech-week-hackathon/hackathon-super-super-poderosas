import { Button, Card } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Modal } from "./Modal";
import { miniGovsInfo } from "@/utils/types";
import { joinMiniGov } from "@/dbRequest";
import { useLucidProvider } from "@/context";

export const MiniGobCard = ({ miniGob }: { miniGob: miniGovsInfo }) => {
  const router = useRouter();
  const { lucidState } = useLucidProvider();
  return (
    <Card.Root>
      <Card.Body display="flex" flexDirection="column" gap="2">
        <Card.Title mt="2">{miniGob.name}</Card.Title>
        <Card.Description>
          Members amount: {miniGob.users_amount}
          <br />
          Token: {miniGob.token.slice(56)}
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
            onClickFn={async () => {
              const address = await lucidState?.wallet.address();
              if (address) {
                await joinMiniGov(address, miniGob.name);
                router.push(`/org/${miniGob.name}`);
              } else {
                console.error("Wallet address is undefined");
                alert("Wallet address is undefined");
              }
            }}
            start={<Button size="sm">Join</Button>}
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
