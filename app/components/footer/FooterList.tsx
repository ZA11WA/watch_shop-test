import React from "react";
import Container from "../Container";


const FooterList = () => {
  return (
    <footer className="bg-stone-100 text-black dark:text-white text-sm mt-15 dark:bg-neutral-900 mt-2">
      <Container>
        <div className="flex flex-col md:flex-row justify-center pt-4 pb-2">
          
          
          <p>&copy; 2023 Tempo Zegara. Wszelkie prawa zastrzeżone.</p>
          
        </div>
      </Container>
    </footer>
  );
};

export default FooterList;
