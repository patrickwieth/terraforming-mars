
import { expect } from "chai";
import { DeimosDown } from "../../src/cards/DeimosDown";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { SelectPlayer } from "../../src/inputs/SelectPlayer";

describe("DeimosDown", function () {
    it("Should play", function () {
        const card = new DeimosDown();
        const player = new Player("test", Color.BLUE, false);
        const game = new Game("foobar", [player], player);
        const action = card.play(player, game);
        expect(action).not.to.eq(undefined);
        expect(action instanceof SelectPlayer).to.eq(true);
        player.plants = 8;
        action.cb(player);
        expect(player.steel).to.eq(4);
        expect(player.plants).to.eq(0);
        expect(game.getTemperature()).to.eq(-24);
    });
});
