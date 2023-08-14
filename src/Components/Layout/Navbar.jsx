import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link } from '@chakra-ui/react'
import { DASHBOARD } from '../../lib/routers'
import { useLogout } from '../../hooks/Auth'

const Navbar = () => {
  const { logout, loading } = useLogout()
  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      borderTop="6px solid"
      borderTopColor="teal.400"
      height="16"
      zIndex="3"
      justify="center"
      bg="white"
    >
      <Flex px="4" w="full" align="center" maxW="1200px">
        <Link color="teal" as={RouterLink} to={DASHBOARD} fontWeight="bold">
          Home
        </Link>
        <Button
          ml="auto"
          colorScheme="teal"
          size="sm"
          onClick={logout}
          isLoading={loading}
        >
          Logout
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar