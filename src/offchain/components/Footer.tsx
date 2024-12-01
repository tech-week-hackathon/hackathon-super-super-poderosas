import { Box, Flex, Link, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export const Footer = () => {
  return (
    <Box bg="black" color="white" py={6}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        <Text fontSize="sm">© {new Date().getFullYear()}, Tx Pipe.</Text>

        {/* Sección de Links */}
        <Stack
          direction={{ base: "column", md: "row" }}
          mt={{ base: 4, md: 0 }}
        >
          <Link
            href="https://github.com/tech-week-hackathon/hackathon-super-super-poderosas"
            fontSize="sm"
            target="_blank"
            rel="noopener noreferrer"
            _hover={{ color: "teal.300" }}
          >
            <Image src="/github.png" alt="Github" width={20} height={20} />
            Repo
          </Link>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Footer;
