import { NavHeader } from "@src/App"
import { Link as Route,useNavigate} from "react-router-dom"
import { Box, Button, HStack, Link } from "@chakra-ui/react"

function LoginHeader() {
    const navigate = useNavigate()

    const back = () => {
        navigate(-1)
    }

    return (
        <>
        <HStack>
            <Button type="button" variant={"outline"} onClick={back}>Back</Button>
        </HStack>
        </>
    )
}

export default function Login() {
    return (
      <>
        <NavHeader nav={<LoginHeader />} />
        <Box position={"absolute"} top={24} width={"100vw"}>
          {"Login"}
        </Box>
      </>
    );
}