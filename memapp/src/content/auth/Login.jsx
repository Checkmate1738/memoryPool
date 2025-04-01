import { NavHeader,SmallDeviceNav,isSmallDevice } from "@src/App"
import { Link as Route,useNavigate} from "react-router-dom"
import { Box, Button, HStack, Link } from "@chakra-ui/react"

function LoginHeader() {
    const navigate = useNavigate()
    const isSmall = isSmallDevice()

    const back = () => {
        navigate(-1)
    }

    return (
      <>
        {isSmall ? (
          <SmallDeviceNav
            data={[
              <Button type="button" variant={"outline"} onClick={back}>
                Back
              </Button>,
            ]}
          />
        ) : (
          <Button type="button" variant={"outline"} onClick={back}>
            Back
          </Button>
        )}
      </>
    );
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