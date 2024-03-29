import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useEffect } from "react";
import { timestamp } from "@/localLib/util";
export default function Home() {
  useEffect(() => {
    const p5 = require("p5");
    new p5((p) => {
      p.setup = () => {
        p.createCanvas(720, 720);
        p.noFill();
        p.background(255);
      };
      p.draw = () => {
        if (p.mouseIsPressed && p.mouseButton === p.LEFT) {
          p.push();
          p.translate(p.width / 2, p.height / 2);
          let circleResolution = p.int(p.map(p.mouseY + 100, 0, p.height, 2, 10));
          let radius = p.mouseX - p.width / 2;
          let angle = p.TAU / circleResolution;
          p.beginShape();
          for (let i = 0; i <= circleResolution; i++) {
            let x = p.cos(angle * i) * radius;
            let y = p.sin(angle * i) * radius;
            p.vertex(x, y);
          }
          p.endShape();
          p.pop();
        }
      };

      p.keyReleased = () => {
        if (p.keyCode === p.DELETE || p.keyCode === p.BACKSPACE) background(255);
        if (p.key === "s" || p.key === "S") p.savaCanvas(timestamp(), "png");
      };
    }, "#canvas");
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>Hello Shape2</h3>
        <cancas id="canvas"></cancas>
      </main>
    </>
  );
}
