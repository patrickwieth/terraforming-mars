import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardResource} from '../../../common/CardResource';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {Size} from '../../../common/cards/render/Size';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';

export class EcologyResearch extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 16,
      tags: [Tag.SCIENCE, Tag.PLANT, Tag.ANIMAL, Tag.MICROBE],
      name: CardName.ECOLOGY_RESEARCH,
      type: CardType.AUTOMATED,
      victoryPoints: 1,

      behavior: {
        production: {plants: {colonies: {colonies: {}}}},
      },

      metadata: {
        description: 'Increase your plant production 1 step for each colony you own. Add 1 animal to ANOTHER card and 2 microbes to ANOTHER card.',
        cardNumber: 'C09',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(1).slash().colonies(1, {size: Size.SMALL})).br;
          b.resource(CardResource.ANIMAL).asterix().nbsp.nbsp.resource(CardResource.MICROBE, 2).asterix();
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    const animalCards = player.getResourceCards(CardResource.ANIMAL);
    if (animalCards.length) {
      player.game.defer(new AddResourcesToCard(player, CardResource.ANIMAL, {count: 1}));
    }

    const microbeCards = player.getResourceCards(CardResource.MICROBE);
    if (microbeCards.length) {
      player.game.defer(new AddResourcesToCard(player, CardResource.MICROBE, {count: 2}));
    }

    return undefined;
  }
}
