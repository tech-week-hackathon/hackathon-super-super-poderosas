import { MiniGobsTable } from "@/components/MiniGobsTable";
import { useLucidProvider } from "@/context";
import { miniGovsInfo } from "@/utils/types";
import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home = () => {
  const [mini, setMini] = useState<miniGovsInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { lucidState } = useLucidProvider();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getAllMiniGovs();
        // setMini(data);
      } catch (err) {
        console.error("Error fetching MiniGovs:", err);
      } finally {
        setLoading(false);
        setMini([
          {
            name: "Error",
            users_amount: 12,
            token: "bla",
          },
        ]);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyItems="center"
      minHeight="100vh"
      gap={5}
      py={5}
      bg="gray.800"
      fontFamily="var(--font-geist-sans)"
    >
      <Head>
        <title>Organizations</title>
      </Head>
      <Heading size="4xl" p="4">
        Organizations to Join!
      </Heading>
      <MiniGobsTable miniGobs={mini} />
    </Box>
  );
};

export default Home;
