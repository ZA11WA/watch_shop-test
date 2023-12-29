import { getCurrentUser } from "@/actions/getCurrentUser";
import FormWrap from "../components/FormWrap";
import LoginForm from "./LoginForm";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <FormWrap>
      <LoginForm currentUser={currentUser} />
    </FormWrap>
  );
};

export default Login;
