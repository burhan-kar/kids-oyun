import BaseScene from "./BaseScene.js";

export default class PuzzleScene extends BaseScene {
  create() {
    this.add.rectangle(195, 345, 390, 690, 0xeadfff);
    this.instruction("Hayvanı aynı gölgeyle eşleştir");
    this.animals = ["🐶","🐱","🐸","🦁"];
    this.selected = null;
    this.done = 0;

    [[105,190],[285,190],[105,390],[285,390]].forEach(([x,y], i) => {
      const box = this.add.rectangle(x,y,145,145,0xffffff,0.55).setStrokeStyle(4,0x8c79c7).setInteractive();
      const ghost = this.txt(x,y,this.animals[i],68).setAlpha(0.22);
      box.on("pointerdown", () => this.place(i, ghost, box));
    });

    ["🐸","🦁","🐶","🐱"].forEach((a,i) => {
      const p = this.txt(55 + i*95, 585, a, 54).setInteractive();
      p.on("pointerdown", () => {
        if (this.selected) this.selected.setScale(1);
        this.selected = p;
        p.setScale(1.2);
        this.speak(a);
      });
    });
    this.speak("Bir hayvana dokun. Sonra aynı şeklin yerine dokun");
  }

  place(i, ghost, box) {
    if (!this.selected) {
      this.speak("Önce bir hayvana dokun");
      return;
    }
    if (this.selected.text === this.animals[i]) {
      ghost.setAlpha(1);
      box.setStrokeStyle(5, 0x52c77a);
      this.selected.destroy();
      this.selected = null;
      this.done += 1;
      this.speak("Harika");
      if (this.done === 4) this.time.delayedCall(400, () => this.finish("Yapboz", "Yapboz tamamlandı!"));
    } else {
      this.selected.setScale(1);
      this.selected = null;
      this.speak("Bir daha deneyelim");
    }
  }
}
