import { siteConfig } from '@/config/site.config';
import { getEventTypeSlugs, findEventBySlug } from '../utils';
describe('getEventTypeSlugs', () => {
  it('should work', () => {
    expect(getEventTypeSlugs().length).toStrictEqual(
      siteConfig.search.eventTypes.length
    );
    expect(getEventTypeSlugs()?.[0]).toStrictEqual(
      siteConfig.search.eventTypes[0].slug
    );
  });
});

describe('findEventBySlug', () => {
  it('should work', () => {
    expect(findEventBySlug('cours-reguliers')).toStrictEqual({
      slug: 'cours-reguliers',
      title: 'Cours réguliers',
    });
  });
});
