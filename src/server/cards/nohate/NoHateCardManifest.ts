import {CardName} from '../../../common/cards/CardName';
import {ModuleManifest} from '../ModuleManifest';
import {EarthOfficeNoHate} from './EarthOfficeNoHate';
import {HelionNoHate} from './HelionNoHate';

export const NOHATE_CARD_MANIFEST = new ModuleManifest({
  module: 'nohate',
  projectCards: {
    [CardName.EARTH_OFFICE_NOHATE]: {Factory: EarthOfficeNoHate},
    [CardName.HELION_NOHATE]: {Factory: HelionNoHate},
  },
  cardsToRemove: [
    CardName.EARTH_OFFICE,
    CardName.HELION,
  ],
});
