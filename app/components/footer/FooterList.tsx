import React from "react";
import Container from "../Container";


const FooterList = () => {
  return (
    <footer className="bg-stone-400 text-slate-200 text-sm mt-15">
      <Container>
        <div className="flex flex-col md:flex-row justify-center pt-4 pb-2">
          
          
          <p>&copy; 2023 Tempo Zegara. Wszelkie prawa zastrzeżone.</p>
          
        </div>
      </Container>
    </footer>
  );
};

export default FooterList;
