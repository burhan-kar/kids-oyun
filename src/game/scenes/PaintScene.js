import BaseScene from "./BaseScene.js";

export default class PaintScene extends BaseScene {
  create() {
    this.add.rectangle(195, 345, 390, 690, 0xffedf7);
    this.instruction("Bir renk seç ve resmi boya");
    this.colors = [0xff5b68, 0xffd34e, 0x58c98b, 0x58a9ff, 0x9f7aea];
    this.color = this.colors[0];
    this.paintCount = 0;

    this.add.rectangle(195, 310, 280, 340, 0xffffff, 0.8).setStrokeStyle(5, 0x7257e8);
    this.txt(195, 300, "🦋", 145);

    this.input.on("pointerdown", p => this.paint(p));
    this.input.on("pointermove", p => { if (p.isDown) this.paint(p); });

    this.colors.forEach((c, i) => {
      this.add.circle(55 + i * 70, 600, 25, c).setStrokeStyle(5, 0xffffff).setInteractive()
        .on("pointerdown", () => {
          this.color = c;
          this.speak(["Kırmızı", "Sarı", "Yeşil", "Mavi", "Mor"][i]);
        });
    });
    this.speak("Bir renk seç ve parmağınla boya");
  }

  paint(p) {
    if (p.y < 120 || p.y > 510) return;
    this.add.circle(p.x, p.y, 17, this.color, 0.82);
    this.paintCount += 1;
    if (this.paintCount === 45) this.finish("Boyama", "Rengarenk bir resim yaptın!");
  }
}
