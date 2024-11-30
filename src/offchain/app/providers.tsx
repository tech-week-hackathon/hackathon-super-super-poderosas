import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { MeshProvider } from "@meshsdk/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MeshProvider>
      <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
    </MeshProvider>
  );
}
