import { TemplateItem } from '../templatesData';
import { autoTemplates, kidsTemplates, designTemplates } from './categoriesAutoKidsDesign';
import { homeRepairTemplates, foodTemplates, animalsTemplates } from './categoriesHomeFoodAnimals';
import { healthTemplates, beautyTemplates, personalTemplates } from './categoriesHealthBeautyPersonal';
import { marketingTemplates, fashionTemplates, musicTemplates } from './categoriesMarketingFashionMusic';
import { realEstateTemplates, educationTemplates, travelTemplates } from './categoriesRealEstateEduTravel';
import { entertainmentTemplates, eventsTemplates, sportsTemplates } from './categoriesEntEventsSports';
import { techTemplates, financeTemplates, legalTemplates, networkMarketingTemplates } from './categoriesTechFinanceLegalNetwork';

export {
  autoTemplates,
  kidsTemplates,
  designTemplates,
  homeRepairTemplates,
  foodTemplates,
  animalsTemplates,
  healthTemplates,
  beautyTemplates,
  personalTemplates,
  marketingTemplates,
  fashionTemplates,
  musicTemplates,
  realEstateTemplates,
  educationTemplates,
  travelTemplates,
  entertainmentTemplates,
  eventsTemplates,
  sportsTemplates,
  techTemplates,
  financeTemplates,
  legalTemplates,
  networkMarketingTemplates
};

export const ALL_CATEGORY_TEMPLATES: TemplateItem[] = [
  ...autoTemplates,
  ...kidsTemplates,
  ...designTemplates,
  ...homeRepairTemplates,
  ...foodTemplates,
  ...animalsTemplates,
  ...healthTemplates,
  ...beautyTemplates,
  ...personalTemplates,
  ...marketingTemplates,
  ...fashionTemplates,
  ...musicTemplates,
  ...realEstateTemplates,
  ...educationTemplates,
  ...travelTemplates,
  ...entertainmentTemplates,
  ...eventsTemplates,
  ...sportsTemplates,
  ...techTemplates,
  ...financeTemplates,
  ...legalTemplates,
  ...networkMarketingTemplates
];
