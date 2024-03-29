import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useEffect } from "react";
import { timestamp } from "@/localLib/util";
import { random } from "chroma-js";
export default function Home() {
  useEffect(() => {
    const p5 = require("p5");
    let count = 0;
    let tileCountX = 10;
    let tileCountY = 10;
    let tileWidth = 0;
    let tileHeight = 0;

    let colorStep = 15;

    let circleCount = 0;
    let endSize = 0;
    let endOffset = 0;

    let actRandomSeed = 0;

    new p5((p) => {
      p.setup = () => {
        p.createCanvas(800, 800);
        tileWidth = p.width / tileCountX;
        tileHeight = p.height / tileCountY;
        p.noFill();
        p.stroke(0, 128);
      };
      p.draw = () => {
        p.background(255);
        p.randomSeed(actRandomSeed);
        p.translate(tileWidth / 2, tileHeight / 2);

        circleCount = p.mouseX / 30 + 1;
        endSize = p.map(p.mouseX, 0, p.max(p.width, p.mouseX), tileWidth / 2, 0);
        endOffset = p.map(
          p.mouseY,
          0,
          p.max(p.height, p.mouseY),
          0,
          (tileWidth - endSize) / 2
        );

        for (let gridY = 0; gridY <= tileCountY; gridY++) {
          for (let gridX = 0; gridX <= tileCountX; gridX++) {
            p.push();
            p.translate(tileWidth * gridX, tileHeight * gridY);
            p.scale(1, tileHeight / tileWidth);

            let toggle = p.int(p.random(0, 4));
            if (toggle === 0) p.rotate(-p.HALF_PI);
            if (toggle === 1) p.rotate(0);
            if (toggle === 2) p.rotate(p.HALF_PI);
            if (toggle === 3) p.rotate(p.PI);

            for (let i = 0; i < circleCount; i++) {
              let diameter = p.map(i, 0, circleCount, tileWidth, endSize);
              let offset = p.map(i, 0, circleCount, 0, endOffset);
              p.ellipse(offset, 0, diameter, diameter);
            }
            p.pop();
          }
        }
      };
      p.mousePressed = () => {
        actRandomSeed = random(100000);
      };
      p.keyReleased = () => {
        if (p.key == "s" || p.key == "S") p.saveCanvas(timestamp(), "png");
      };
    }, "#canvas");
  }, []);

  return (
    <>
      <Head>
        <title>グリッドと複合モジュール1(p2_1_3_01)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>グリッドと複合モジュール1(p2_1_3_01)</h3>
        <div>s:save png</div>
        <cancas id="canvas"></cancas>
      </main>
    </>
  );
}
