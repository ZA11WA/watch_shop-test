import Link from "next/link";
import Container from "../Container";
import { Montserrat } from "next/font/google";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";
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
            
            
          <div className="flex items-center justify-between gap-6 md:gap-0">
            <div className="flex items-start">
              <CategoriesMenu />

            </div>
            <Link
              className={`${montserrat.className} font-bold text-2xl text-neutral-950 dark:text-white uppercase`}
              href={"/"}
            >
              Tempo Zegara
            </Link>
            {
              <div className="hidden md:block">
                <SearchBar />
              </div>
            }
            <div className="flex items-center gap-8 md:gap-12 dark:text-white">
              <ThemeSwitcher />
              <CartCount />

              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
