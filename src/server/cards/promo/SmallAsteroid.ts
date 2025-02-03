import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class SmallAsteroid extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.SMALL_ASTEROID,
      tags: [Tag.SPACE],
      cost: 10,

      behavior: {
        global: {temperature: 1},
      },

      metadata: {
        cardNumber: '209',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).br;
        }),
        description: 'Increase temperature 1 step.',
      },
    });
  }
}
