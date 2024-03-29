import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import { useEffect } from "react";
import { timestamp } from "@/localLib/util";
export default function Home() {
  useEffect(() => {
    const p5 = require("p5");

    let tileCount = 20;
    let actRandomSeed = 0;

    let moduleColorBackground;
    let moduleColorForeground;

    let moduleAlphaBackground = 100;
    let moduleAlphaForeground = 200;

    let moduleRadiusBackground = 30;
    let moduleRadiusForeground = 15;

    let backgroundColor;

    new p5((p) => {
      p.setup = () => {
        p.createCanvas(600, 600);
        p.colorMode(p.HSB, 360, 100, 100, 100);
        p.noStroke();

        moduleColorBackground = p.color(0, 0, 0, moduleAlphaBackground);
        moduleColorForeground = p.color(0, 0, 100, moduleAlphaForeground);

        backgroundColor = p.color(0, 0, 100);
      };
      p.draw = () => {
        p.translate(p.width / tileCount / 2, p.height / tileCount / 2);
        p.background(backgroundColor);
        p.randomSeed(actRandomSeed);
        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            var posX = (p.width / tileCount) * gridX;
            var posY = (p.height / tileCount) * gridY;
            let shiftX = (p.random(-1, 1) * p.mouseX) / 20;
            let shiftY = (p.random(-1, 1) * p.mouseY) / 20;
            p.fill(moduleColorBackground);
            p.ellipse(
              posX + shiftX,
              posY + shiftY,
              moduleRadiusBackground,
              moduleRadiusForeground
            );
          }
        }
        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            let posX = (p.width / tileCount) * gridX;
            let posY = (p.height / tileCount) * gridY;
            p.fill(moduleColorForeground);
            p.ellipse(posX, posY, moduleRadiusBackground, moduleRadiusForeground);
          }
        }
      };
      p.mousePressed = () => {
        actRandomSeed = p.random(100000);
      };
      p.keyReleased = () => {
        if (p.key == "s" || p.key == "S") p.saveCanvas(timestamp(), "png");

        if (p.key == "1") {
          if (
            colorsEqual(moduleColorBackground, p.color(0, 0, 0, moduleAlphaBackground))
          ) {
            moduleColorBackground = p.color(273, 73, 51, moduleAlphaBackground);
          } else {
            moduleColorBackground = p.color(0, 0, 0, moduleAlphaBackground);
          }
        }
        if (p.key == "2") {
          if (
            colorsEqual(
              moduleColorForeground,
              p.color(360, 100, 100, moduleAlphaForeground)
            )
          ) {
            moduleColorForeground = p.color(323, 100, 77, moduleAlphaForeground);
          } else {
            moduleColorForeground = p.color(360, 100, 100, moduleAlphaForeground);
          }
        }

        if (p.key == "3") {
          if (moduleAlphaBackground == 100) {
            moduleAlphaBackground = 50;
            moduleAlphaForeground = 50;
          } else {
            moduleAlphaBackground = 100;
            moduleAlphaForeground = 100;
          }

          moduleColorBackground = p.color(
            p.hue(moduleColorBackground),
            p.saturation(moduleColorBackground),
            p.brightness(moduleColorBackground),
            moduleAlphaBackground
          );
          moduleColorForeground = p.color(
            p.hue(moduleColorForeground),
            p.saturation(moduleColorForeground),
            p.brightness(moduleColorForeground),
            moduleAlphaForeground
          );
        }

        if (p.key == "0") {
          moduleRadiusBackground = 30;
          moduleRadiusForeground = 15;
          moduleAlphaBackground = 100;
          moduleAlphaForeground = 100;
          moduleColorBackground = p.color(0, 0, 0, moduleAlphaBackground);
          moduleColorForeground = p.color(0, 0, 100, moduleAlphaForeground);
        }

        if (p.keyCode == p.UP_ARROW) moduleRadiusBackground += 2;
        if (p.keyCode == p.DOWN_ARROW)
          moduleRadiusBackground = p.max(moduleRadiusBackground - 2, 10);
        if (p.keyCode == p.LEFT_ARROW)
          moduleRadiusForeground = p.max(moduleRadiusForeground - 2, 5);
        if (p.keyCode == p.RIGHT_ARROW) moduleRadiusForeground += 2;
      };
    }, "#canvas");
    function colorsEqual(col1, col2) {
      return col1.toString() == col2.toString();
    }
  }, []);

  return (
    <>
      <Head>
        <title>グリッドと動き2(p2_1_2_02)</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h3>グリッドと動き2(p2_1_2_02)</h3>
        <div>
          1:背面のシェイプに色をつける, 2:前面のシェイプに色をつける, 3:透明度を追加,
        </div>
        <div>s:save png, クリック:再配置</div>
        <div>↑↓：幅調整, ←→：高さ調整</div>
        <cancas id="canvas"></cancas>
      </main>
    </>
  );
}
