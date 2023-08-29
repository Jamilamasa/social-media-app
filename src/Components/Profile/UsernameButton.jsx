import { Button } from "@chakra-ui/react";
import { PROTECTED } from "../../lib/routers";
import { Link } from "react-router-dom";

const UsernameButton = ({user}) => {
    
  return (
    <Button
      as={Link}
      to={`${PROTECTED}/profile/${user?.id}`}
      colorScheme="teal"
      variant="link"
    >
      {user?.username}
    </Button>
  );
};

export default UsernameButton;
