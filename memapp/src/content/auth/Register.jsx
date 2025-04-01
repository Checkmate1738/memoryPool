import { NavHeader,isSmallDevice,SmallDeviceNav } from "@src/App"
import { Link as Route,useNavigate} from "react-router-dom"
import { Box, Button, HStack, Link } from "@chakra-ui/react"
import { LuChevronLeft } from "react-icons/lu"

function RegisterHeader() {
    const navigate = useNavigate()
    const small = isSmallDevice()

    const back = () => {
        navigate(-1)
    }

    return small ? (
      <SmallDeviceNav
        data={[
          <Box
            width={"100%"}
            onClick={back}
            display={"flex"}
            padding={2}
            alignItems={"center"}
          >
            <LuChevronLeft />
            Back
          </Box>,
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