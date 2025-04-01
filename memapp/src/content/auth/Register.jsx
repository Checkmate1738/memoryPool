import { NavHeader,isSmallDevice,SmallDeviceNav } from "@src/App"
import { Link as Route,useNavigate} from "react-router-dom"
import { Box, Button, HStack, Link } from "@chakra-ui/react"

function RegisterHeader() {
    const navigate = useNavigate()
    const small = isSmallDevice()

    const back = () => {
        navigate(-1)
    }

    return small ? (
      <SmallDeviceNav
        data={[
          <Button type="button" variant={"plain"} onClick={back}>
            Back
          </Button>,
        ]}
      />
    ) : (
      <HStack>
        <Button type="button" variant={"outline"} onClick={back}>
          Back
        </Button>
      </HStack>
    );
}

export default function Register() {
    return <>
    <NavHeader nav={<RegisterHeader/>}/>
    <Box position={"absolute"} top={24} width={"100vw"}>
        {"Register"}
    </Box>
    </>
}