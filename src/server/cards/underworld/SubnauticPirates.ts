import {CardType} from '../../../common/cards/CardType';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IPlayer} from '../../IPlayer';
import {SelectSpace} from '../../inputs/SelectSpace';

export class SubnauticPirates extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.SUBNAUTIC_PIRATES,
      type: CardType.EVENT,
      cost: 3,

      requirements: [{excavation: 1}, {corruption: 1}],
      victoryPoints: -1,

      metadata: {
        cardNumber: 'U11',
        renderData: CardRenderer.builder((b) => {
          b.oceans(1).excavate().asterix().colon().text('  ').megacredits(6);
        }),
        description: 'Requires 1 excavation marker and 1 corruption. Pick an ocean tile ' +
        'that has your excavation marker on it. Gain 6 M€ for each other player that ' +
        'owns a tile adjacent to that ocean.',
      },
    });
  }

  private availableSpaces(player: IPlayer) {
    return player.game.board.getOceanSpaces().filter((space) => space.excavator === player);
  }

  public override bespokeCanPlay(player: IPlayer) {
    return this.availableSpaces(player).length > 0;
  }

  public override bespokePlay(player: IPlayer) {
    return new SelectSpace('Select an ocean space you have excavated', this.availableSpaces(player))
      .andThen((space) => {
        const adjacentSpaces = player.game.board.getAdjacentSpaces(space);
        const set = new Set<IPlayer>();
        for (const space of adjacentSpaces) {
          if (space.player !== undefined && space.player !== player) {
            set.add(space.player);
          }
        }

        set.forEach(() => {
          player.megaCredits += 6;
        });
        return undefined;
      });
  }
}
