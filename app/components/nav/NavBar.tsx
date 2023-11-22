
import Link from "next/link";
import Container from "../Container";
import { Montserrat } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });
const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-slate-500 z-30 shadow-sm mb-2">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link
              className={`${montserrat.className} font-bold text-2xl`}
              href={"/"}
            >
              E-Shop
            </Link>
            { <div className="hidden md:block"><SearchBar/></div> }
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
               <UserMenu currentUser={currentUser}/> 
            </div>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
};

export default NavBar;
