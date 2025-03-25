import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class CorporateTheft extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.CORPORATE_THEFT,
      type: CardType.EVENT,
      cost: 10,

      requirements: {corruption: 2},

      behavior: {
        addResourcesToAnyCard: {
          count: 1,
          mustHaveCard: true,
          robotCards: true,
        },
        underworld: {corruption: 1},
      },

      metadata: {
        cardNumber: 'U61',
        renderData: CardRenderer.builder((b) => {
          b.text('STEAL').wild(1).corruption().asterix();
        }),
        description: 'Requires 2 corruption. Aquire 1 resource and put it on any of your cards. ' +
          'Gain 1 corruption. ',
      },
    });
  }
}
