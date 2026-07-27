import BaseScene from "./BaseScene.js";

export default class NumberTrainScene extends BaseScene {
  create() {
    this.bg(0xc5f4ff, 0x8bd36b);
    this.instruction("Elmaları vagona koy");
    this.count = 0;
    this.txt(195, 180, "🚂", 100);
    this.wagon = this.txt(195, 350, "🟦", 115);
    this.apple = this.txt(195, 560, "🍎", 66).setInteractive();
    this.numberText = this.txt(195, 460, "0", 58);
    this.apple.on("pointerdown", () => this.collect());
    this.speak("Elmaya dokun ve vagona koy");
  }

  collect() {
    const flying = this.txt(this.apple.x, this.apple.y, "🍎", 55);
    this.tweens.add({
      targets: flying,
      y: 360,
      duration: 350,
      onComplete: () => {
        flying.destroy();
        this.count += 1;
        this.numberText.setText(String(this.count));
        this.speak(String(this.count));
        if (this.count >= 5) this.finish("Sayı Treni", "Beş elma topladın!");
      }
    });
  }
}
