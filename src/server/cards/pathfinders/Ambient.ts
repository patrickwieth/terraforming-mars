import {CorporationCard} from '../corporation/CorporationCard';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {digit} from '../Options';
import {ICard} from '../ICard';
import {MAX_TEMPERATURE} from '../../../common/constants';
import {Size} from '../../../common/cards/render/Size';
import {Units} from '../../../common/Units';

export class Ambient extends CorporationCard {
  constructor() {
    super({
      name: CardName.AMBIENT,
      tags: [Tag.VENUS],
      startingMegaCredits: 40,

      firstAction: {
        text: 'Raise the Venus scale 2 steps.',
        //     LogHelper.logVenusIncrease(player, actual);
        global: {venus: 2},
      },

      metadata: {
        cardNumber: 'PfC3',
        description: 'You start with 38 M€. As your first action, raise the Venus scale 2 steps.',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(38).venus(2, {size: Size.SMALL}).br;
          b.effect('When you play a card with a Venus tag (including this) increase your heat production 1 step.', (eb) => {
            eb.tag(Tag.VENUS).startEffect.production((pb) => pb.heat(1));
          }).br;
          b.action('When temperature is maxed, spend 7 heat gain 1 TR. ' +
            'You may repeat this action like a standard project.', (ab) => {
            ab.heat(7, {digit, size: Size.SMALL}).startAction.tr(1, {size: Size.SMALL}).text('∞');
          });
        }),
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    this.onCorpCardPlayed(player, this);
    return undefined;
  }

  public onCorpCardPlayed(player: IPlayer, card: ICorporationCard) {
    this.onCardPlayed(player, card);
  }

  public onCardPlayed(player: IPlayer, card: ICard): void {
    if (player.isCorporation(this.name) && card.tags.includes(Tag.VENUS)) {
      player.production.add(Resource.HEAT, 1, {log: true});
    }
  }

  public canAct(player: IPlayer) {
    return player.heat >= 7 && player.game.getTemperature() === MAX_TEMPERATURE && player.canAfford({cost: 0, reserveUnits: Units.of({heat: 7}), tr: {tr: 1}});
  }

  public action(player: IPlayer) {
    player.heat -= 7;
    player.increaseTerraformRating();
    // A hack that allows this action to be replayable.
    player.defer(() => {
      player.getActionsThisGeneration().delete(this.name);
    });
    return undefined;
  }
}
