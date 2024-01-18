import Link from "next/link";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SearchBar from "./SearchBar";
import ThemeSwitcher from "../Button/ThemeSwitcher";
import { SafeUser } from "@/types";
import Categories from "./Categories";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="sticky top-0 w-full bg-stone-100 dark:bg-neutral-900 z-30 shadow-md mb-1 px-3">
      <div className="py-4 border-b-[1px]">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-6 md:gap-12 order-1 md:order-1">
            <Categories />
            <Link
              className="font-bold text-2xl text-neutral-950 dark:text-white uppercase"
              href={"/"}
            >
              Tempo Zegara
            </Link>
          </div>

          <div className="order-3 md:order-2 w-full md:w-auto pt-2 md:pt-0 flex justify-center">
            <SearchBar />
          </div>

          <div className="flex items-center gap-6 md:gap-8 dark:text-white mt-4 md:mt-0 justify-center md:justify-end w-full md:w-auto order-2 md:order-3">
            <ThemeSwitcher />
            <CartCount />
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
