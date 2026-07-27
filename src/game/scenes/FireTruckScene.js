import Phaser from "phaser";
import BaseScene from "./BaseScene.js";

export default class FireTruckScene extends BaseScene {
  create() {
    this.bg(0x72d8ff, 0x656e77);
    this.instruction("Aracı sür ve yangını söndür");
    this.txt(330, 450, "🏠", 110);
    this.flame = this.txt(330, 350, "🔥", 72);
    this.truck = this.txt(75, 535, "🚒", 94);
    this.x = 75;
    this.done = false;
    this.left = this.txt(55, 635, "⬅️", 50).setInteractive();
    this.right = this.txt(335, 635, "➡️", 50).setInteractive();
    this.water = this.txt(195, 635, "💧", 50).setInteractive();
    this.left.on("pointerdown", () => this.move(-24));
    this.right.on("pointerdown", () => this.move(24));
    this.water.on("pointerdown", () => this.spray());
    this.speak("İtfaiye aracını sağa sür ve yangını söndür");
  }

  move(dx) {
    if (this.done) return;
    this.x = Phaser.Math.Clamp(this.x + dx, 60, 285);
    this.tweens.add({ targets: this.truck, x: this.x, duration: 90 });
  }

  spray() {
    if (this.done) return;
    if (this.x < 230) {
      this.speak("Yangına biraz daha yaklaş");
      return;
    }
    this.done = true;
    for (let i = 0; i < 11; i++) {
      const d = this.txt(this.x + 38, 490, "💧", 27);
      this.tweens.add({ targets: d, x: 325, y: 350 + Math.random() * 40, duration: 520, delay: i * 70, onComplete: () => d.destroy() });
    }
    this.time.delayedCall(900, () => {
      this.flame.setVisible(false);
      this.finish("İtfaiye", "Harika! Yangın söndü.");
    });
  }
}
