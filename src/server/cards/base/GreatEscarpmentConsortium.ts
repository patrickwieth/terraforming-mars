import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {DecreaseAnyProduction} from '../../deferredActions/DecreaseAnyProduction';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';
import {GainProduction} from '../../deferredActions/GainProduction';

export class GreatEscarpmentConsortium extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.GREAT_ESCARPMENT_CONSORTIUM,
      cost: 6,

      requirements: {production: Resource.STEEL, count: 1},
      metadata: {
        cardNumber: '061',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.plus().steel(1);
          });
        }),
        description: 'Requires that you have steel production. Increase steel production 1 step.',
      },
    });
  }
}
