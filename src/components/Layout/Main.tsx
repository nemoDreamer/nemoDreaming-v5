import Container from "./Container";
import SubHeader, { H1 } from "./SubHeader";

const Main = ({
  children,
  subHeader,
  title,
}: React.PropsWithChildren<{
  subHeader?: React.ReactNode;
  title?: string;
}>) => {
  return (
    <main className="flex-1 z-10 bg-gray-100">
      {(subHeader || title) && (
        <SubHeader>{subHeader || <H1>{title}</H1>}</SubHeader>
      )}

      <Container className="py-4 px-4 print:py-0">{children}</Container>
    </main>
  );
};

export default Main;
