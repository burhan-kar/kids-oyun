import Phaser from "phaser";
import BaseScene from "./BaseScene.js";

export default class AnimalSoundScene extends BaseScene {
  create() {
    this.bg(0xc6f4ff, 0x9edb7a);
    this.instruction("Sesini dinle ve hayvanı bul");
    this.round = 0;
    this.animals = [
      { icon: "🐱", name: "Kedi", sound: "Miyav" },
      { icon: "🐶", name: "Köpek", sound: "Hav hav" },
      { icon: "🐄", name: "İnek", sound: "Mööö" },
      { icon: "🦁", name: "Aslan", sound: "Kükreme" }
    ];
    this.buttons = [];
    this.nextRound();
  }

  nextRound() {
    this.buttons.forEach(b => b.destroy());
    this.buttons = [];
    this.target = Phaser.Utils.Array.GetRandom(this.animals);
    this.txt(195, 140, "🔊", 75).setInteractive().on("pointerdown", () => this.speak(this.target.sound));
    this.speak(this.target.sound);

    const pos = [[105,310],[285,310],[105,500],[285,500]];
    this.animals.forEach((a, i) => {
      const b = this.txt(pos[i][0], pos[i][1], a.icon, 78).setInteractive();
      b.on("pointerdown", () => this.check(a));
      this.buttons.push(b);
    });
  }

  check(a) {
    if (a.name === this.target.name) {
      this.round += 1;
      this.speak("Harika");
      if (this.round >= 4) this.finish("Hayvan Sesleri", "Hayvan seslerini çok güzel buldun!");
      else this.nextRound();
    } else {
      this.speak("Bir daha dinleyelim");
      this.speak(this.target.sound);
    }
  }
}
