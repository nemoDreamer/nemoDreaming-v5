import Head from "next/head";
import Link from "next/link";
import React from "react";

import Layout, { siteTitle } from "../../components/layout";

const subHeader = (
  <React.Fragment>
    <h1 className="text-2xl font-bold">About</h1>
    <p>
      <Link href="../">
        <a>&larr; Back</a>
      </Link>
    </p>
    <p>
      Lorem ipsum, dolor{" "}
      <code>
        sit amet <em>consectetur</em>
      </code>{" "}
      adipisicing elit. Explicabo architecto fugiat magnam ab, cum unde, eos
      nostrum dolorum ipsa error possimus saepe tempore voluptas perferendis.
      Quia ipsum veniam quasi quisquam!
    </p>
  </React.Fragment>
);

const About = (): JSX.Element => (
  <Layout subHeader={subHeader}>
    <Head>
      <title>{siteTitle} | About</title>
    </Head>

    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius rem tempore
      ex, error debitis cum ratione dicta alias, dignissimos corrupti facilis
      voluptates recusandae voluptatibus reiciendis! Ad culpa expedita, nostrum
      aut sequi placeat. Corrupti dolorem temporibus libero ea laudantium id
      natus nesciunt illum eveniet iure ducimus non dolor, rem dolore at quo
      odio laborum quisquam eum explicabo labore nulla accusamus. Ipsum,
      aperiam! Doloribus suscipit amet cum! Maiores possimus sit qui maxime
      voluptates commodi soluta labore illo illum deleniti, inventore ipsam rem
      earum veniam! Deleniti consequatur et minus molestiae voluptatibus
      consequuntur ipsum, libero distinctio vitae aliquid reiciendis velit nam
      labore quos laudantium commodi enim asperiores veniam suscipit doloribus
      id quas saepe.
    </p>

    <p>
      Rem nulla ullam corporis sint minima excepturi consectetur fugit id, quo
      porro eos maiores nostrum laboriosam aperiam quas quaerat earum hic! Aut
      tenetur vitae delectus modi temporibus officiis minus pariatur autem, qui
      magni deleniti quo! Porro sunt ullam incidunt hic aliquid iusto commodi
      ipsam. Provident atque recusandae, accusantium, optio aspernatur enim
      quibusdam quis fugit doloribus ab voluptatibus saepe id laboriosam vitae
      unde ea a corrupti odio, quaerat voluptatem veniam quod! Aspernatur quam a
      rem similique. Error sit ipsa dolores. Quo sint alias, sit nobis error
      assumenda similique placeat amet! Atque, soluta.
    </p>
  </Layout>
);

export default About;
