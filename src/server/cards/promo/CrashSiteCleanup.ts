import {IPlayer} from '../../IPlayer';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../render/CardRenderer';

export class CrashSiteCleanup extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.CRASH_SITE_CLEANUP,
      cost: 4,
      victoryPoints: 1,

      behavior: {
        stock: {titanium: 1, steel: 2},
      },

      metadata: {
        description: 'Lose all plants. Gain 1 titanium and 2 steel.',
        cardNumber: 'X17',
        renderData: CardRenderer.builder((b) => {
          b.minus().text("ALL").plants(1).br;
          b.titanium(1).steel(2);
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.stock.deduct(Resource.PLANTS, player.plants, {log: true});
    return undefined;
  }
}

