import { Grid, Card, Button, Heading } from "@chakra-ui/react";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "50 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "50 900",
});

const miniGobs = [
  {
    name: "a",
    members: 12,
    ada: 123,
  },
  {
    name: "b",
    members: 12123,
    ada: 7890,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
  {
    name: "b",
    members: 12123,
    ada: 7890,
  },
  {
    name: "b",
    members: 12123,
    ada: 7890,
  },
  {
    name: "b",
    members: 12123,
    ada: 7890,
  },
  {
    name: "b",
    members: 12123,
    ada: 7890,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
  {
    name: "c",
    members: 102,
    ada: 321,
  },
];

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col items-center justify-items-center min-h-screen gap-5 py-5 font-[family-name:var(--font-geist-sans)]`}
    >
      <Heading size="4xl">Mini Govs to Join!</Heading>
      <Grid templateColumns="repeat(4, 1fr)" gap="6">
        {miniGobs.map((miniGob) => (
          <Card.Root>
            <Card.Body gap="2">
              <Card.Title mt="2">{miniGob.name}</Card.Title>
              <Card.Description>
                Members amount: {miniGob.members}
                <br />
                ADA amount: {miniGob.ada}
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button>Join</Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </Grid>
      {/* <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/tech-week-hackathon/hackathon-super-super-poderosas"
          target="_blank"
          rel="noopener noreferrer"
        >
          Repo
        </a>
      </footer> */}
    </div>
  );
}
