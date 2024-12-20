import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {ActionCard} from '../ActionCard';
import {CardType} from '../../../common/cards/CardType';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SmallAnimals extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SMALL_ANIMALS,
      tags: [Tag.ANIMAL],
      cost: 6,

      resourceType: CardResource.ANIMAL,
      victoryPoints: {resourcesHere: {}, per: 2},
      requirements: {oxygen: 6},

      action: {
        addResources: 1,
      },

      metadata: {
        cardNumber: '054',
        renderData: CardRenderer.builder((b) => {
          b.action('Add 1 animal to this card.', (eb) => {
            eb.empty().startAction.resource(CardResource.ANIMAL);
          }).br;
          b.vpText('1 VP per 2 animals on this card.');
        }),
        description: {
          text: 'Requires 6% oxygen.',
          align: 'left',
        },
      },
    });
  }
}
