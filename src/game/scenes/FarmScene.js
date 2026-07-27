import BaseScene from "./BaseScene.js";

export default class FarmScene extends BaseScene {
  create() {
    this.bg(0xbdf3ff, 0x9ad36f);
    this.instruction("Yeme dokun, hayvana ver");
    this.animals = ["🐄","🐑","🐔"];
    this.foods = ["🌽","🥕","🌾"];
    this.index = 0;
    this.score = 0;

    this.animal = this.txt(195, 300, this.animals[0], 110);
    this.food = this.txt(195, 560, this.foods[0], 75).setInteractive();
    this.food.on("pointerdown", () => this.feed());
    this.txt(80, 500, "🏡", 72);
    this.txt(315, 500, "🌳", 72);
    this.speak("Yeme dokun ve hayvana ver");
  }

  feed() {
    this.tweens.add({
      targets: this.food,
      y: 360,
      duration: 450,
      yoyo: true,
      onComplete: () => {
        this.score += 1;
        this.index = (this.index + 1) % this.animals.length;
        this.animal.setText(this.animals[this.index]);
        this.food.setText(this.foods[this.index]);
        this.food.y = 560;
        this.speak("Afiyet olsun");
        if (this.score >= 5) this.finish("Çiftlik", "Hayvanları güzel besledin!");
      }
    });
  }
}
