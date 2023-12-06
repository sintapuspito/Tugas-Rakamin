import { VStack, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Books from "../components/Books";
import { getAllBooks } from "../modules/fetch";

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
    <VStack w="100vw" align="center" bg="teal">
        <SimpleGrid columns={2} spacing={6} w="70%" p={6}>
            {books?.books?.map((book) => (
            <Books key={`${book.id} ${book.title}`} {...book} />
            ))}
        </SimpleGrid>
    </VStack>
    )
}
