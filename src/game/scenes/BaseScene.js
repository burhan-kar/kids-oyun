import Phaser from "phaser";
import { speak } from "../../speech.js";

export default class BaseScene extends Phaser.Scene {
  txt(x, y, text, size = 30, color = "#24324a") {
    return this.add.text(x, y, text, {
      fontFamily: "Arial, sans-serif",
      fontSize: `${size}px`,
      color,
      fontStyle: "bold",
      align: "center",
      wordWrap: { width: 350 }
    }).setOrigin(0.5);
  }

  instruction(text) {
    this.add.rectangle(195, 38, 340, 46, 0xffffff, 0.94).setStrokeStyle(2, 0xffffff);
    this.txt(195, 38, text, 19);
  }

  speak(text) {
    speak(text);
  }

  finish(gameName, message) {
    this.add.rectangle(195, 345, 390, 690, 0x24324a, 0.36);
    this.txt(195, 260, "🎉", 88);
    this.txt(195, 350, message, 27);
    this.txt(195, 430, "⭐ ⭐ ⭐", 34);
    for (let i = 0; i < 22; i++) {
      const c = this.txt(Phaser.Math.Between(20, 370), Phaser.Math.Between(-90, -15), ["⭐","🎈","✨","🎉"][i % 4], 25);
      this.tweens.add({ targets: c, y: 720, angle: Phaser.Math.Between(-270, 270), duration: Phaser.Math.Between(1300, 2200), delay: Phaser.Math.Between(0, 400) });
    }
    this.speak(message);
    this.onComplete?.(gameName, 3);
  }

  bg(top = 0x9de1ff, bottom = 0x94d46f) {
    this.add.rectangle(195, 180, 390, 360, top);
    this.add.rectangle(195, 540, 390, 310, bottom);
  }
}
