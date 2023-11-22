import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-slate-200 text-sm mt-15">
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2">Kategorie</h3>
            <Link href={"#"}>Zegarki</Link>
            <Link href={"#"}>Opaski</Link>

            <Link href={"#"}>Akcesoria</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Kategorie</h3>
            <Link href={"#"}>Zegarki</Link>
            <Link href={"#"}>Opaski</Link>

            <Link href={"#"}>Akcesoria</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Kategorie</h3>
            <Link href={"#"}>Zegarki</Link>
            <Link href={"#"}>Opaski</Link>

            <Link href={"#"}>Akcesoria</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Kategorie</h3>
            <Link href={"#"}>Zegarki</Link>
            <Link href={"#"}>Opaski</Link>

            <Link href={"#"}>Akcesoria</Link>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
