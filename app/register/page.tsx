import { getCurrentUser } from "@/actions/getCurrentUser";
import FormWrap from "../components/FormWrap";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <FormWrap>
      <RegisterForm currentUser={currentUser} />
    </FormWrap>
  );
};

export default Register;
