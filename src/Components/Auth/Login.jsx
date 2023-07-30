import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Text, Link } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import { REGISTER } from '../../lib/routers'

 const Login = () => {
  return (
    <Center w="100%" h="100vh">
    <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
      <Heading mb="4" size="lg" textAlign="center">
        Log In
      </Heading>

      <form onSubmit={()=>{}}>
        <FormControl py="2">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="user@email.com"
      
          />
          <FormErrorMessage>
    
          </FormErrorMessage>
        </FormControl>
        <FormControl py="2">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password123"
           
          />
          <FormErrorMessage>
    
          </FormErrorMessage>
        </FormControl>
        <Button
          mt="4"
          type="submit"
          colorScheme="teal"
          size="md"
          w="full"
       isLoading={false}
          loadingText="Logging In"
        >
          Log In
        </Button>
      </form>

      <Text fontSize="xlg" align="center" mt="6">
        Don't have an account?{" "}
        <Link
          as={RouterLink}
          to={REGISTER}
          color="teal.800"
          fontWeight="medium"
          textDecor="underline"
          _hover={{ background: "teal.100" }}
        >
          Register
        </Link>{" "}
        instead!
      </Text>
    </Box>
  </Center>
  )
}

export default Login