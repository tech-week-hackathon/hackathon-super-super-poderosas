import { Button, Dialog, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

export const Modal2 = ({
  title,
  start,
  children,
  error,
}: {
  title: string;
  start: ReactElement;
  children: ReactElement;
  error: string | null;
}) => {
  return (
    <Dialog.Root motionPreset="slide-in-bottom" size={"full"}>
      <Dialog.Trigger asChild>
        <Flex p="3">{start}</Flex>
      </Dialog.Trigger>
      <Dialog.Backdrop bg="rgba(0, 0, 0, 0.8)" />
      <Dialog.Content
        borderColor={"pink.400"}
        borderWidth={1}
        p={6}
        borderRadius="lg"
        style={{
          width: "70vw",
          height: "10vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body
          style={{
            flex: 1, // Hace que el body tome el espacio restante
            overflow: "auto", // Habilita el desplazamiento
          }}
        >
          {children}
        </Dialog.Body>
        <Dialog.Footer
          style={{
            marginTop: "auto", // Asegura que el footer quede al final
          }}
        >
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <div>{error}</div>
        </Dialog.Footer>
        <Dialog.CloseTrigger />
      </Dialog.Content>
    </Dialog.Root>
  );
};
