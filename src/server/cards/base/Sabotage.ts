import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Sabotage extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.SABOTAGE,
      victoryPoints: -2,
      cost: 1,

      behavior: {
        underworld: {corruption: 2},
      },

      metadata: {
        cardNumber: '121',
        renderData: CardRenderer.builder((b) => {
          b.corruption(2);
        }),
        description: 'Gain 2 corruption.',
      },
    });
  }
}

