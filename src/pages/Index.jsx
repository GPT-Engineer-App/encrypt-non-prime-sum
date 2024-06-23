import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box } from "@chakra-ui/react";

const Index = () => {
  const [number, setNumber] = useState("");
  const [encryptionKey, setEncryptionKey] = useState(null);

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  const calculateEncryptionKey = (num) => {
    const digits = num.split("").map(Number);
    const nonPrimeSum = digits.reduce((sum, digit) => {
      if (!isPrime(digit)) {
        return sum + digit;
      }
      return sum;
    }, 0);
    return nonPrimeSum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = calculateEncryptionKey(number);
    setEncryptionKey(key);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Input
          placeholder="Enter a number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          maxW="300px"
        />
        <Button type="submit" colorScheme="blue">
          Calculate Encryption Key
        </Button>
        {encryptionKey !== null && (
          <Box p={4} borderWidth={1} borderRadius="md" borderColor="gray.200">
            <Text fontSize="xl">Encryption Key: {encryptionKey}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;