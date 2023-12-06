import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
import Wrapper from "@/components/Wrapper";
import { useRouter } from "next/router";

export default function register() {
  const Register = () => {
    const [name, setName] = useState(""); // Tambah state untuk nama
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const toast = useToast();
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Validasi form
      if (!name || !password || password !== confirmPassword) {
        setError("Please fill in all fields correctly.");
        return;
      }

      try {
        await registerUser(name, e.target.email.value, password);
        toast({
          title: "Registered",
          description: "You have successfully registered.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/");
      } catch (e) {
        setError(e.message || "An error occurred. Please try again.");
      }
    };

    return (
      <Wrapper>
        <Box w="full" py={4} px={24} mx="auto" mt={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Register
          </Text>

          <Box borderWidth="1px" borderRadius="lg" p={4}>
            <form onSubmit={handleSubmit}>
              {error && (
                <Box color="red.500" mb={4}>
                  {error}
                </Box>
              )}

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                />
              </FormControl>

              {/* ... code for password inputs and confirm password */}
              
              <Button mt={6} colorScheme="teal" type="submit">
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </Wrapper>
    );
  };
}
