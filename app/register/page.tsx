import { getActiveUser } from "@/actions/getActiveUser";
import FormContainer from "../components/FormContainer";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  const activeUser = await getActiveUser();
  return (
    <FormContainer>
      <RegisterForm activeUser={activeUser} />
    </FormContainer>
  );
};

export default Register;
