import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class BiomassCombustors extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.BIOMASS_COMBUSTORS,
      tags: [Tag.POWER, Tag.BUILDING, Tag.PLANT],
      cost: 4,
      victoryPoints: 1,

      // This might not work for Robotic Workforce yet.
      behavior: {
        production: {energy: 2, plants: -1},
      },

      requirements: {oxygen: 3},
      metadata: {
        description: 'Requires 3% oxygen. Decrease plant production 1 step and increase your energy production 2 steps.',
        cardNumber: '183',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.minus().plants(-1).br;
            pb.plus().energy(2);
          });
        }),
      },
    });
  }
}
