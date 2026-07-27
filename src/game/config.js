import Phaser from "phaser";
import AnimalTowerScene from "./scenes/AnimalTowerScene.js";
import FireTruckScene from "./scenes/FireTruckScene.js";
import RescueScene from "./scenes/RescueScene.js";
import FarmScene from "./scenes/FarmScene.js";
import PuzzleScene from "./scenes/PuzzleScene.js";
import PaintScene from "./scenes/PaintScene.js";
import AnimalSoundScene from "./scenes/AnimalSoundScene.js";
import NumberTrainScene from "./scenes/NumberTrainScene.js";

const scenes = {
  tower: AnimalTowerScene,
  fire: FireTruckScene,
  rescue: RescueScene,
  farm: FarmScene,
  puzzle: PuzzleScene,
  paint: PaintScene,
  sound: AnimalSoundScene,
  numbers: NumberTrainScene
};

export function createGameConfig(parent, gameId, onComplete) {
  const Scene = scenes[gameId] || AnimalTowerScene;

  return {
    type: Phaser.AUTO,
    parent,
    width: 390,
    height: 690,
    backgroundColor: "#bdeeff",
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: "matter",
      matter: { gravity: { y: 1.05 }, debug: false }
    },
    scene: class RuntimeScene extends Scene {
      constructor() {
        super();
        this.onComplete = onComplete;
      }
    }
  };
}
