import Phaser from "phaser";
import BaseScene from "./BaseScene.js";

export default class RescueScene extends BaseScene {
  create() {
    this.bg(0xa7e9ff, 0x555e66);
    this.instruction("Doğru aracı seç ve sür");
    this.need = Phaser.Utils.Array.GetRandom(["🚑","🚓","🚒"]);
    this.selected = "🚑";
    this.xPos = 70;
    this.done = false;

    const targetIcon = this.need === "🚑" ? "🤕" : this.need === "🚓" ? "🦹" : "🔥";
    this.txt(70, 120, "🚑", 46).setInteractive().on("pointerdown", () => this.pick("🚑"));
    this.txt(195, 120, "🚓", 46).setInteractive().on("pointerdown", () => this.pick("🚓"));
    this.txt(320, 120, "🚒", 46).setInteractive().on("pointerdown", () => this.pick("🚒"));
    this.target = this.txt(330, 500, targetIcon, 74);
    this.vehicle = this.txt(this.xPos, 540, this.selected, 92);
    this.left = this.txt(55, 635, "⬅️", 50).setInteractive();
    this.right = this.txt(335, 635, "➡️", 50).setInteractive();
    this.left.on("pointerdown", () => this.move(-25));
    this.right.on("pointerdown", () => this.move(25));

    this.speak(this.need === "🚑" ? "Ambulansı seç ve yaralıya git" : this.need === "🚓" ? "Polis aracını seç ve hırsızı yakala" : "İtfaiyeyi seç ve yangına git");
  }

  pick(v) {
    this.selected = v;
    this.vehicle.setText(v);
    this.speak(v === "🚑" ? "Ambulans" : v === "🚓" ? "Polis arabası" : "İtfaiye");
  }

  move(dx) {
    if (this.done) return;
    this.xPos = Phaser.Math.Clamp(this.xPos + dx, 60, 300);
    this.tweens.add({ targets: this.vehicle, x: this.xPos, duration: 90 });
    if (this.xPos >= 295) {
      if (this.selected === this.need) {
        this.done = true;
        this.finish("Kurtarma", "Yardım ulaştı!");
      } else {
        this.speak("Başka bir araç seçelim");
        this.xPos = 70;
        this.vehicle.x = this.xPos;
      }
    }
  }
}
