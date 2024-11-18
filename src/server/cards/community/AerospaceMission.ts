import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {BuildColony} from '../../deferredActions/BuildColony';
import {CardRenderer} from '../render/CardRenderer';
import {Resource} from '../../../common/Resource';

export class AerospaceMission extends PreludeCard {
  constructor() {
    super({
      name: CardName.AEROSPACE_MISSION,
      tags: [Tag.SPACE],
      startingMegacredits: -12,

      metadata: {
        cardNumber: 'Y01',
        renderData: CardRenderer.builder((b) => {
          b.colonies(1).nbsp.colonies(1).br;
          b.minus().megacredits(14);
        }),
        description: 'Place 2 colonies. Pay 12 M€.',
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer) {
    return player.canAfford(12);
  }

  public override bespokePlay(player: IPlayer) {
    player.stock.deduct(Resource.MEGACREDITS, 12);
    player.game.defer(new BuildColony(player, {title: 'Select where to build the first colony'}));
    player.game.defer(new BuildColony(player, {title: 'Select where to build the second colony'}));
    return undefined;
  }
}
