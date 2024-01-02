import Link from "next/link";
import Container from "../Container";
import { Montserrat } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "../Button/ThemeSwitcher";
import CategoriesMenu from "./CategoriesMenu";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400"] });
const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-stone-100 dark:bg-neutral-900 z-30 shadow-md mb-1">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center gap-6 md:gap-12 order-1">
              <CategoriesMenu />
              <Link
                className={`${montserrat.className} font-bold text-2xl text-neutral-950 dark:text-white uppercase`}
                href={"/"}
              >
                Tempo Zegara
              </Link>
            </div>

            <div className="flex items-center gap-6 md:gap-8 dark:text-white mt-4 md:mt-0 justify-center md:justify-end w-full md:w-auto order-2 md:order-3">
              <ThemeSwitcher />
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>

            <div className="flex-grow order-3 md:order-2 pt-2">
              <SearchBar />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
