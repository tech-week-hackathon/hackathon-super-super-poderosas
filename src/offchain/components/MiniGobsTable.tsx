import { Grid } from "@chakra-ui/react";
import { MiniGobCard } from "./MiniGobCard";
import { miniGovsInfo } from "@/utils/types";

export const MiniGobsTable = ({ miniGobs }: { miniGobs: miniGovsInfo[] }) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="6">
      {miniGobs.map((miniGob) => (
        <MiniGobCard key={miniGob.name} miniGob={miniGob} />
      ))}
    </Grid>
  );
};
