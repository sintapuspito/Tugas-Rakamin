import { VStack, HStack, Image, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllBooks } from "../modules/fetch";
import { Link } from 'react-router-dom';

export default function Homepage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getAllBooks();
      setBooks(books);
    };
    fetchBooks();
  }, []);

  return (
    <VStack w="100%" spacing={8} align="center" bg="teal" p={8}>
      <HStack w="100%" spacing={8} justify="center">
        <VStack maxW="300vw" textAlign="center" p={4} borderRadius="md">
          <Text fontSize={"35px"} fontWeight="bold" textColor={"white"}>
            Welcome to BooksHub Enjoy your reading!
          </Text>
          <Text fontSize={"16px"} textColor={"white"}>
            BooksHub adalah sebuah aplikasi yang menyediakan berbagai macam buku
          </Text>
          <Button as={Link} to="/books" colorScheme="yellow" size="lg" fontWeight={"bold"} textColor={"white"}>
            Get Started
          </Button>
        </VStack>
        <VStack p={4} borderRadius="md">
          <Image
            src="/src/assets/images/booklist.png"
            alt="Welcome Image 1"
            borderRadius="md"
            boxSize="110%"
          />
        </VStack>
      </HStack>

      <HStack w="100%" spacing={8} justify="center">
        <VStack maxW="80%" textAlign="center" bg="white" p={4} borderRadius="md">
          <Image
            src="/src/assets/images/Atomic-Habits.png"
            alt="Read More Image 1"
            borderRadius="md"
            boxSize="40%"
          />
          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Baca Lebih Lanjut
          </Text>
          <Button as={Link} to="/books" colorScheme="teal" size="lg" >
            Read More
          </Button>
        </VStack>

        <VStack maxW="100%" textAlign="center" bg="white" p={4} borderRadius="md">
          <Image
            src="/src/assets/images/Atomic-Habits.png"
            alt="Add Collection Image 1"
            borderRadius="md"
            boxSize="40%"
          />
          <Text fontSize="xl" fontWeight="bold" mt={4}>
            Tambahkan ke Koleksi
          </Text>
          <Button as={Link} to="/newbook" colorScheme="teal" size="lg">
            Add Collection
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
}
