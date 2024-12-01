import { Button, Dialog, Flex } from "@chakra-ui/react";
import { ReactElement } from "react";

export const Modal = ({
  title,
  start,
  children,
  confirmText,
  onClickFn,
  error,
}: {
  title: string;
  start: ReactElement;
  children: ReactElement;
  confirmText: string;
  onClickFn: () => void;
  error: string | null;
}) => {
  return (
    <Dialog.Root placement={"center"} motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Flex p="3">{start}</Flex>
      </Dialog.Trigger>
      <Dialog.Backdrop bg="rgba(0, 0, 0, 0.8)" />
      <Dialog.Content
        borderColor={"pink.400"}
        borderWidth={1}
        p={6}
        position={"fixed"}
        top={"30%"}
        left={"33%"}
        borderRadius="lg"
      >
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>{children}</Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <div>{error}</div>
          <Button onClick={onClickFn}>{confirmText}</Button>
        </Dialog.Footer>
        <Dialog.CloseTrigger />
      </Dialog.Content>
    </Dialog.Root>
  );
};
