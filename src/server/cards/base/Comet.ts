import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Comet extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.COMET,
      tags: [Tag.SPACE],
      cost: 21,

      behavior: {
        global: {temperature: 1},
        ocean: {},
      },

      metadata: {
        cardNumber: '010',
        description: 'Raise temperature 1 step and place an ocean tile.',
        renderData: CardRenderer.builder((b) => {
          b.temperature(1).oceans(1).br;
        }),
      },
    });
  }
}
