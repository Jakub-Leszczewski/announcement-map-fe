interface Address{
  country: string;
  city: string;
  zipCode: string;
  street?: string;
  buildingNumber?: string;
  apartamentNumber?:string;
}

interface ReturnType {
  lat: number,
  lon: number,
  country: string,
  city: string,
  zipCode: string,
  street?: string;
  buildingNumber?: string;
  apartamentNumber?: string;
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

      if (data.length > 0) return {
        lat: Number(data[0].lat),
        lon: Number(data[0].lon),
        country,
        city,
        zipCode,
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
