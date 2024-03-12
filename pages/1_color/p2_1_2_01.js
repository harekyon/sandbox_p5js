import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useEffect } from "react";
import { timestamp } from "@/localLib/util";
export default function Home() {
  useEffect(() => {
    const p5 = require("p5");

    let tileCount = 20;
    let actRandomSeed = 0;
    let circleAlpha = 130;
    let circleColor;

    new p5((p) => {
      p.setup = () => {
        p.createCanvas(600, 600);
        p.noFill();
        circleColor = p.color(0, 0, 0, circleAlpha);
      };
      p.draw = () => {
        p.translate(p.width / tileCount / 2, p.height / tileCount / 2);
        p.background(255);
        p.randomSeed(actRandomSeed);
        p.stroke(circleColor);
        p.strokeWeight(p.mouseY / 60);

        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            let posX = (p.width / tileCount) * gridX;
            let posY = (p.height / tileCount) * gridY;
            let shiftX = p.random(-p.mouseX, p.mouseX) / 20;
            let shiftY = p.random(-p.mouseX, p.mouseX) / 20;
            p.ellipse(posX + shiftX, posY + shiftY, p.mouseX / 15, p.mouseY / 15);
          }
        }
      };
      p.mousePressed = () => {
        actRandomSeed = p.random(100000);
      };
      p.keyReleased = () => {
        if (p.key === "s" || p.key === "S") p.saveCanvas(timestamp(), "png");
      };
    }, "#canvas");
  }, []);

  return (
    <>
      <Head>
        <title>グリッドと動き1(p2_1_2_01)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>グリッドと動き1(p2_1_2_01)</h3>
        <div>s:save png, クリック:再配置</div>
        <cancas id="canvas"></cancas>
      </main>
    </>
  );
}
