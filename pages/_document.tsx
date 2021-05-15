import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import * as React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{
    html: string;
    head?: (JSX.Element | null)[] | undefined;
    styles?:
      | React.ReactFragment
      | React.ReactElement<
          Record<string, unknown>,
          string | React.JSXElementConstructor<Record<string, unknown>>
        >[]
      | undefined;
  }> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/fmg4grs.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
