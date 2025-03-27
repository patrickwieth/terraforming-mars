import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class PrivateSecurity extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.PRIVATE_SECURITY,
      cost: 8,
      tags: [Tag.EARTH],

      action: {
        spend: {megacredits: 4},
        underworld: {corruption: 1},
      },

      metadata: {
        cardNumber: 'Pf25',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 4M€ to gain 1 curruption.',
            (ab) => ab.megacredits(4).startAction.corruption(1)).br;
        }),
      },
    });
  }
}

