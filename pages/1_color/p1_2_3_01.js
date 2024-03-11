import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useEffect, useRef } from "react";
import { aseEncode, timestamp } from "@/localLib/util";
const tileCountX = 50;
const tileCountY = 10;
const hueValues = [];
const brightnessValues = [];
const saturationValues = [];
export default function Home() {
  const img = useRef(null);

  useEffect(() => {
    const p5 = require("p5");

    new p5((p) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();
        for (let i = 0; i < tileCountX; i++) {
          hueValues[i] = p.random(360);
          saturationValues[i] = p.random(100);
          brightnessValues[i] = p.random(100);
        }
      };
      p.draw = () => {
        p.background(0, 0, 100);
        let mX = p.constrain(p.mouseX, 0, p.width);
        let mY = p.constrain(p.mouseY, 0, p.height);

        let counter = 0;

        let currentTileCountX = p.int(p.map(mX, 0, p.width, 1, tileCountX));
        let currentTileCountY = p.int(p.map(mY, 0, p.height, 1, tileCountY));
        let tileWidth = p.width / currentTileCountX;
        let tileHeight = p.height / currentTileCountY;

        for (let gridY = 0; gridY < tileCountY; gridY++) {
          for (let gridX = 0; gridX < tileCountX; gridX++) {
            let posX = tileWidth * gridX;
            let posY = tileHeight * gridY;
            let index = counter % currentTileCountX;
            p.fill(hueValues[index], saturationValues[index], brightnessValues[index]);
            p.rect(posX, posY, tileWidth, tileHeight);
            counter++;
          }
        }
      };

      p.keyReleased = () => {
        if (p.key === "s" || p.key === "S") p.saveCanvas(timestamp(), "png");
        if (p.key === "c" || p.key === "C") {
          let colors = [];
          for (let i = 0; i < hueValues.length; i++) {
            colors.push(p.color(hueValues[i], saturationValues[i], brightnessValues[i]));
          }
          p.writeFile([aseEncode(colors), timestamp(), "ase"]);
        }
        if (p.key == "1") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = p.random(360);
            saturationValues[i] = p.random(100);
            brightnessValues[i] = p.random(100);
          }
        }

        if (p.key == "2") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = p.random(360);
            saturationValues[i] = p.random(100);
            brightnessValues[i] = 100;
          }
        }

        if (p.key == "3") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = p.random(360);
            saturationValues[i] = 100;
            brightnessValues[i] = p.random(100);
          }
        }

        if (p.key == "4") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = 0;
            saturationValues[i] = 0;
            brightnessValues[i] = p.random(100);
          }
        }

        if (p.key == "5") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = 195;
            saturationValues[i] = 100;
            brightnessValues[i] = p.random(100);
          }
        }

        if (p.key == "6") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = 195;
            saturationValues[i] = p.random(100);
            brightnessValues[i] = 100;
          }
        }

        if (p.key == "7") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = p.random(180);
            saturationValues[i] = p.random(80, 100);
            brightnessValues[i] = p.random(50, 90);
          }
        }

        if (p.key == "8") {
          for (var i = 0; i < tileCountX; i++) {
            hueValues[i] = p.random(180, 360);
            saturationValues[i] = p.random(80, 100);
            brightnessValues[i] = p.random(50, 90);
          }
        }

        if (p.key == "9") {
          for (var i = 0; i < tileCountX; i++) {
            if (i % 2 == 0) {
              hueValues[i] = p.random(360);
              saturationValues[i] = 100;
              brightnessValues[i] = p.random(100);
            } else {
              hueValues[i] = 195;
              saturationValues[i] = p.random(100);
              brightnessValues[i] = 100;
            }
          }
        }

        if (p.key == "0") {
          for (var i = 0; i < tileCountX; i++) {
            if (i % 2 == 0) {
              hueValues[i] = 140;
              saturationValues[i] = p.random(30, 100);
              brightnessValues[i] = p.random(40, 100);
            } else {
              hueValues[i] = 210;
              saturationValues[i] = p.random(40, 100);
              brightnessValues[i] = p.random(50, 100);
            }
          }
        }
      };
    }, "#canvas");
  }, []);

  return (
    <>
      <Head>
        <title>ルールで作るカラーパレット</title>
        <meta name="description" content="ルールで作るカラーパレット" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>ルールで作るカラーパレット</h3>
        {/* <Link href="/installConsidation/">導入・実装方法のパターン</Link> */}
        <cancas id="canvas"></cancas>
      </main>
    </>
  );
}
