import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.scss";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>導入方法の検討</h3>
        <Link href="/installConsidation/IC1_page_moduled">scriptタグで呼び出す方法</Link>
        <br />
        <Link href="/installConsidation/IC2_page_require">requireで呼び出す方法</Link>
      </main>
    </>
  );
}
