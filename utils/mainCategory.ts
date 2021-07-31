const categoryMappings = {
  'front-end+javascript': 'javascript',
  'inicjatywy+opinie': 'opinie',
  opinie: 'opinie',
  'dobry-kod+front-end+javascript': 'dobry-kod',
  'back-end+javascript': 'javascript',
  'back-end+front-end+javascript': 'javascript',
  'dobry-kod+javascript': 'dobry-kod',
  'javascript+opinie': 'opinie',
  wpis: 'opinie',
  'dobry-kod': 'dobry-kod',
  'opinie+praca-zdalna': 'praca-zdalna',
  'front-end+opinie': 'opinie',
  'dobry-kod+inicjatywy': 'dobry-kod',
  'dobry-kod+opinie': 'dobry-kod',
  javascript: 'javascript',
  'front-end': 'javascript',
  'praca-zdalna': 'praca-zdalna',
  inicjatywy: 'opinie',
  'back-end+dobry-kod+front-end+javascript': 'javascript',
  'back-end+opinie': 'opinie',
  'back-end': 'javascript',
  'back-end+dobry-kod': 'dobry-kod',
  'back-end+front-end': 'javascript',
  'inicjatywy+praca-zdalna': 'praca-zdalna',
} as const;

export function categoriesToMainCategory(categories?: readonly { readonly name: string; readonly slug: string }[]) {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ok, because we know the type
  const categoryMappingKey = categories
    ?.map((c) => c.slug)
    .sort()
    .join('+') as keyof typeof categoryMappings | undefined;
  const mainCategorySlug = categoryMappingKey ? categoryMappings[categoryMappingKey] : null;
  const mainCategory = categories?.find((c) => c.slug === mainCategorySlug) ?? null;
  return mainCategory;
}