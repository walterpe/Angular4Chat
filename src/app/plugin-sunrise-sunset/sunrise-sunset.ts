export class SunriseSunset {
  public sunrise: string;
  public sunset: string;
  public solar_noon: string;
  public day_length: string;
  public civil_twilight_begin: string;
  public civil_twilight_end: string;
  public nautical_twilight_begin: string;
  public nautical_twilight_end: string;
  public astronomical_twilight_begin: string;
  public astronomical_twilight_end: string;
}

export class Coord {
  public lat: number;
  public lng: number;
}

export const cityCoordinates = {
  lausanne: {
    lat: 46.519962,
    lng: 6.633597
  },
  hawai: {
    lat: 21.289373,
    lng: -157.917480
  },
  venise: {
    lat: 48.858093,
    lng: 2.294694
  }
};
