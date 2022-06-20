interface Address{
  country: string;
  city: string;
  zipCode: string;
  street?: string;
  buildingNumber?: string;
}

interface ReturnType {
  lat: number,
  lon: number,
  street: string | undefined;
  buildingNumber: string | undefined;
  all: boolean;
}

export async function checkAddressCoords ({
  country,
  city,
  zipCode,
  street,
  buildingNumber
}: Address): Promise<ReturnType | null> {
  try {
    let all = true;
    for(let i = 0; i < 3; i++) {
      const findStreet = (street && i < 2) ? street : undefined;
      const findBuildingNumber = (buildingNumber && i < 1) ? buildingNumber : undefined;

      const query = encodeURIComponent(`${country} ${city} ${zipCode}${
        findStreet ? ` ${findStreet}` : ''}${findBuildingNumber ? ` ${findBuildingNumber}` : ''}`);

      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&`);
      const data = await res.json();

      if(data.length > 0 && data[0].class !== 'building') all = false;
      if (data.length > 0) console.log(data);
      if (data.length > 0) return {
        lat: data[0].lat,
        lon: data[0].lon,
        street: findStreet,
        buildingNumber: findBuildingNumber,
        all,
      };
      all = false;
    }
  } catch (err) {
    console.log(err)
  }

  return null;
}
