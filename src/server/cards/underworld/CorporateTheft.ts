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

      requirements: {corruption: 1},

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
          b.wild(1).asterix().br;
          b.corruption();
        }),
        description: 'Requires 1 corruption. Aquire 1 resource and put it on any of your cards. ' +
          'Gain 1 corruption. ',
      },
    });
  }
}
