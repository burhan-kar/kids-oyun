import Phaser from "phaser";
import BaseScene from "./BaseScene.js";

export default class AnimalTowerScene extends BaseScene {
  create() {
    this.bg();
    this.instruction("Hayvana dokun ve kule yap");
    this.txt(60, 96, "☁️", 50);
    this.txt(330, 145, "☁️", 50);
    this.txt(330, 520, "🏠", 92);
    this.txt(195, 632, "🌾", 92);

    this.matter.add.rectangle(195, 615, 230, 30, { isStatic: true });
    this.animals = ["🐘","🐄","🐑","🐶","🐱","🐰","🐸","🐥"];
    this.count = 0;
    this.done = false;

    this.next = this.txt(80, 125, this.animals[0], 72).setInteractive();
    this.tweens.add({ targets: this.next, x: 310, duration: 1500, yoyo: true, repeat: -1, ease: "Sine.easeInOut" });
    this.input.on("pointerdown", () => this.drop());
    this.speak("Hayvana dokun ve samanların üzerine bırak");
  }

  drop() {
    if (this.done) return;
    const animal = this.add.text(this.next.x, 145, this.next.text, { fontSize: "64px" }).setOrigin(0.5);
    this.matter.add.gameObject(animal, { restitution: 0.05, friction: 0.85, density: 0.004 });
    this.count += 1;
    this.next.setText(this.animals[this.count % this.animals.length]);
    this.speak(this.count % 2 ? "Harika" : "Bir hayvan daha");
    if (this.count >= 7) {
      this.done = true;
      this.time.delayedCall(1800, () => this.finish("Hayvan Kulesi", "Harika bir hayvan kulesi yaptın!"));
    }
  }
}
