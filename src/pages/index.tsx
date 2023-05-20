import { Header } from "@/components/Header/Header";
import { HomePage } from "@/views/Home/Home";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>ShareStory</title>
        <meta name="description" content="Story sharing site" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomePage />
      </main>
    </>
  );
}
