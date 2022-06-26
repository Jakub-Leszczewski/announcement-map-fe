import React, { ChangeEvent } from 'react'
import { ShortTextInput } from '../../common/ShortTextInput/ShortTextInput'
import { CityZipCodeInputFields } from '../CityZipCodeInputFields/CityZipCodeInputFields';
import './AddressInputFields.css'
import {
  StreetBuildingApartamentInputFields
} from '../StreetBuildingApartamentInputFields/StreetBuildingApartamentInputFields'
import { checkAddressCoords } from '../../../utils/check-address-coords'

interface Props {
  form: {
    country: string;
    city: string;
    zipCode: string;
    street: string | null;
    buildingNumber: string | null;
    apartamentNumber: string | null;
  };
  changeFormHandle: (e: ChangeEvent<HTMLInputElement>) => void;
  findAddress: Awaited<ReturnType<typeof checkAddressCoords>> | undefined;
}

export const AddressInputFields = ({form, changeFormHandle, findAddress}: Props) => {
  return(
    <>
      {findAddress === null ? <p className="AddAnnouncementView__error">Podany adres jest błędny</p> : null}
      {
        findAddress && !findAddress.all
          ? <p className="AddAnnouncementView__message">
              Nie znaleziono dokładnego adresu. Najbliższy adres wyświetlany na mapie to:
              <strong>
                {` ${findAddress.country} ${findAddress.city} ${findAddress.zipCode} ${findAddress.street || ''}`}
              </strong>.
              <br/>
              W treści ogłoszenia będzie widoczny adres wpisany przez ciebie. Zaakceptuj klikając Dodaj lub zmień adres.
            </p>
          : null
      }

      <div className="AddressInputFields">
        <p>Adres:</p>
        <ShortTextInput
          placeholder="kraj*"
          name="country"
          maxLength={60}
          minLength={2}
          required
          value={form.country}
          onChange={changeFormHandle}
        />

        <CityZipCodeInputFields
          changeFormHandle={changeFormHandle}
          form={form}
        />

        <StreetBuildingApartamentInputFields
          form={form}
          changeFormHandle={changeFormHandle}
        />
      </div>
    </>
  )
}
