import Container from "../Container";

import SubHeader from "./SubHeader";

const Main = ({
  children,
  subHeader,
}: React.PropsWithChildren<{
  subHeader?: React.ReactNode;
}>) => {
  return (
    <main className="flex-1 z-10 bg-gray-100">
      {subHeader && <SubHeader>{subHeader}</SubHeader>}

      <Container className="py-4 px-4 print:py-0">{children}</Container>
    </main>
  );
};

export default Main;
