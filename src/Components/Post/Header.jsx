import { Avatar, Box, Flex } from '@chakra-ui/react'
import React from 'react'

const Header = ({post}) => {
    const { uid, date } = post;
    // const { user, isLoading } = useUser(uid);
  
    // if (isLoading) return "Loading...";
  
    return (
      <Flex
        alignItems="center"
        borderBottom="2px solid"
        borderColor="teal.100"
        p="3"
        bg="gray.50"
      >
        {/* <Avatar user={user} size="md" />
  
        <Box ml="4">
          <UsernameButton user={user} />
          <Text fontSize="sm" color="gray.500">
            {formatDistanceToNow(date)} ago
          </Text>
        </Box> */}
      </Flex>
    );
}

export default Header