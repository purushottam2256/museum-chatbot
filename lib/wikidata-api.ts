const WIKIDATA_ENDPOINT = 'https://www.wikidata.org/w/api.php';
const WIKIDATA_SPARQL_ENDPOINT = 'https://query.wikidata.org/sparql';

export type City = {
  id: string;
  label: string;
  description?: string;
}

export type Museum = {
  id: string;
  name: string;
}

export interface MuseumDetails {
  id: string;
  name?: string;
  description?: string;
  inception?: string;
  address?: string;
  website?: string;
  image?: string;
}

interface WikidataEntity {
  labels: {
    en?: {
      value: string;
    };
  };
  descriptions: {
    en?: {
      value: string;
    };
  };
  claims: {
    [propertyId: string]: WikidataClaim[];
  };
}

interface WikidataClaim {
  mainsnak: WikidataMainSnak;
}

interface WikidataMainSnak {
  datatype: string;
  datavalue?: WikidataDataValue;
}

interface WikidataDataValue {
  value: string | WikidataItemValue;
  type: string;
}

interface WikidataItemValue {
  id: string;
  'entity-type': string;
}

export async function searchIndianCities(query: string): Promise<City[]> {
  const params = new URLSearchParams({
    action: 'wbsearchentities',
    search: query,
    language: 'en',
    format: 'json',
    type: 'item',
    limit: '5',
    origin: '*'
  });

  try {
    const response = await fetch(`${WIKIDATA_ENDPOINT}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
   
    const indianCities = await Promise.all(data.search.map(async (item: { id: string; label: string; description?: string }) => {
      const isIndianCity = await checkIfIndianCity(item.id);
      return isIndianCity ? {
        id: item.id,
        label: item.label,
        description: item.description
      } : null;
    }));

    return indianCities.filter((city): city is City => city !== null);
  } catch (error) {
    console.error('Error searching Indian cities:', error);
    throw error;
  }
}

async function checkIfIndianCity(entityId: string): Promise<boolean> {
  const query = `
    ASK {
      wd:${entityId} wdt:P31/wdt:P279* wd:Q515.
      wd:${entityId} wdt:P17 wd:Q668.
    }
  `;

  const params = new URLSearchParams({
    query: query,
    format: 'json'
  });

  try {
    const response = await fetch(`${WIKIDATA_SPARQL_ENDPOINT}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.boolean;
  } catch (error) {
    console.error('Error checking if entity is an Indian city:', error);
    return false;
  }
}

export async function getMuseumsInCity(cityId: string): Promise<Museum[]> {
  const query = `
    SELECT ?museum ?museumLabel WHERE {
      ?museum wdt:P31/wdt:P279* wd:Q33506.
      ?museum wdt:P131 wd:${cityId}.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
    }
    LIMIT 10
  `;

  const params = new URLSearchParams({
    query: query,
    format: 'json'
  });

  try {
    const response = await fetch(`${WIKIDATA_SPARQL_ENDPOINT}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results.bindings.map((item: { museum: { value: string }; museumLabel: { value: string } }) => ({
      id: item.museum.value.split('/').pop() || '',
      name: item.museumLabel.value
    }));
  } catch (error) {
    console.error('Error fetching museums:', error);
    throw error;
  }
}

export async function getMuseumDetails(museumId: string): Promise<MuseumDetails> {
  const params = new URLSearchParams({
    action: 'wbgetentities',
    ids: museumId,
    props: 'labels|descriptions|claims',
    languages: 'en',
    format: 'json',
    origin: '*'
  });

  try {
    const response = await fetch(`${WIKIDATA_ENDPOINT}?${params}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const entity = data.entities[museumId] as WikidataEntity;

    return {
      id: museumId,
      name: entity.labels?.en?.value,
      description: entity.descriptions?.en?.value,
      inception: getClaimValue(entity, 'P571'),
      address: getClaimValue(entity, 'P6375'),
      website: getClaimValue(entity, 'P856'),
      image: getImageUrl(getClaimValue(entity, 'P18'))
    };
  } catch (error) {
    console.error('Error fetching museum details:', error);
    throw error;
  }
}

function getClaimValue(entity: WikidataEntity, propertyId: string): string | undefined {
  const claims = entity.claims[propertyId];
  if (claims && claims.length > 0) {
    const mainSnak = claims[0].mainsnak;
    if (mainSnak.datatype === 'wikibase-item' && mainSnak.datavalue?.type === 'wikibase-entityid') {
      return (mainSnak.datavalue.value as WikidataItemValue).id;
    } else if (mainSnak.datavalue && typeof mainSnak.datavalue.value === 'string') {
      return mainSnak.datavalue.value;
    }
  }
  return undefined;
}

function getImageUrl(filename: string | undefined): string | undefined {
  if (!filename) return undefined;
  const encodedFilename = encodeURIComponent(filename.replace(/ /g, '_'));
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodedFilename}`;
}