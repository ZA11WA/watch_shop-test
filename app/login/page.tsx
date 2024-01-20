import { getActiveUser } from "@/actions/getActiveUser";
import FormContainer from "../components/FormContainer";
import LoginForm from "./LoginForm";

const Login = async () => {
  const currentUser = await getActiveUser();
  return (
    <FormContainer>
      <LoginForm activeUser={currentUser} />
    </FormContainer>
  );
};

export default Login;
