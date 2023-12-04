import Container from "../components/Container";
import FormWrap from "../components/FormWrap";
import CheckoutClient from "./CheckoutClient";


const Checkout = () => {
    return ( 

        <div className="p-8">
            <Container>
                
                    <CheckoutClient/>
                
            </Container>
        </div>
     );
}
 
export default Checkout;