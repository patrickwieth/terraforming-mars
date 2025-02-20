import {IActionCard} from '../ICard';
import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardResource} from '../../../common/CardResource';
import {CardName} from '../../../common/cards/CardName';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {RemoveResourcesFromCard} from '../../deferredActions/RemoveResourcesFromCard';
import {CardRenderer} from '../render/CardRenderer';
import {all} from '../Options';

export class Predators extends Card implements IProjectCard, IActionCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.PREDATORS,
      tags: [Tag.ANIMAL],
      cost: 14,

      resourceType: CardResource.ANIMAL,
      victoryPoints: {resourcesHere: {}},
      requirements: {oxygen: 11},

      metadata: {
        cardNumber: '024',
        renderData: CardRenderer.builder((b) => {
          b.action('Remove 1 animal from any of your cards and add 2 to this card.', (eb) => {
            eb.resource(CardResource.ANIMAL, {all}).startAction.resource(CardResource.ANIMAL).resource(CardResource.ANIMAL);
          }).br;
          b.vpText('1 VP per animal on this card.');
        }),
        description: 'Requires 11% oxygen.',
      },
    });
  }

  public canAct(player: IPlayer): boolean {
    return RemoveResourcesFromCard.getAvailableTargetCards(player, CardResource.ANIMAL, 'self').length > 0;
  }

  public action(player: IPlayer) {
    player.game.defer(
      new RemoveResourcesFromCard(player, CardResource.ANIMAL, 1, {source: 'self', blockable: false})
        .andThen((response) => {
          if (response.proceed) {
            player.game.defer(new AddResourcesToCard(player, CardResource.ANIMAL, {count: 2, filter: (c) => c.name === this.name}));
          }
        }));
    return undefined;
  }
}
