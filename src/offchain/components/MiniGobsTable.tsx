import { Grid } from "@chakra-ui/react";
import { MiniGobCard } from "./MiniGobCard";

// TODO: CHANGE THIS
export interface Member {
  name: string;
  ada: number;
}
export interface Gob {
  name: string;
  members: Member[];
  ada: number;
}

export const MiniGobsTable = ({ miniGobs }: { miniGobs: Gob[] }) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      {miniGobs.map((miniGob) => (
        <MiniGobCard key={miniGob.name} miniGob={miniGob} />
      ))}
    </Grid>
  );
};
