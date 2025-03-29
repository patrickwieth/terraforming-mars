import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {IProjectCard} from '../IProjectCard';
import {CardResource} from '../../../common/CardResource';
import {CardType} from '../../../common/cards/CardType';
import {ActionCard} from '../ActionCard';

export class PrivateMilitaryContractor extends ActionCard implements IProjectCard {
  // TODO
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.PRIVATE_MILITARY_CONTRACTOR,
      cost: 18,
      tags: [Tag.JOVIAN, Tag.SPACE],
      resourceType: CardResource.FIGHTER,

      requirements: {corruption: 2},
      victoryPoints: {resourcesHere: {}},

      behavior: {
        addResources: 1,
      },

      action: {
        spend: {titanium: 1},
        addResources: 1,
      },

      metadata: {
        cardNumber: 'U49',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 titanium to add 1 fighter resource to this card.',
            (ab) => ab.titanium(1).startAction.resource(CardResource.FIGHTER)).br;
          b.resource(CardResource.FIGHTER);
        }),
        description: 'Requires 2 Corruption. Add 1 fighter resource to this card.',
      },
    });
  }
}

