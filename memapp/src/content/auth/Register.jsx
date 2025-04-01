import { NavHeader,isSmallDevice,SmallDeviceNav } from "@src/App"
import { Link as Route,useNavigate} from "react-router-dom"
import { Box, Button, HStack, Link } from "@chakra-ui/react"
import {useColorModeValue} from "@src/components/ui/color-mode"
import { LuChevronLeft } from "react-icons/lu"

function RegisterHeader() {
    const backBg = useColorModeValue("blue.200","blue.400")
    const backColor = useColorModeValue("blue.500","blue.800")
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
        <Button type="button" variant={"subtle"} borderRadius={12} size={"lg"} onClick={back} bgColor={backBg} display={"flex"} alignItems={"center"} justifyContent={"flex-start"} color={backColor}>
          <LuChevronLeft/>
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