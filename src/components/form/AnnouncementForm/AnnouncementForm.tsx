import React, { ChangeEvent, FormEvent } from 'react'
import './AnnouncementForm.css';
import { TitlePriceInputFields } from '../TitlePriceInputFields/TitlePriceInputFields'
import { LongTextInput } from '../../common/LongTextInput/LongTextInput'
import { SelectCategories } from '../../SelectCategories/SelectCategories'
import { AddressInputFields } from '../AddressInputFields/AddressInputFields'
import { AnnouncementDto } from 'types'
import { checkAddressCoords } from '../../../utils/check-address-coords'

interface Props {
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  changeFormHandler: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  form: AnnouncementDto;
  findAddress: undefined | Awaited<ReturnType<typeof checkAddressCoords>>;
  resetFindAddressHandler: () => void;
  id: string;
}

export const AnnouncementForm = ({form, findAddress, resetFindAddressHandler, id, changeFormHandler, onSubmitHandler}: Props) => {
  return(
    <form onSubmit={onSubmitHandler} id={id} className="AnnouncementForm">
      <TitlePriceInputFields
        required
        form={form}
        changeFormHandle={changeFormHandler}
      />

      <LongTextInput
        name="description"
        label="Opis:"
        maxLength={255}
        minLength={0}
        onChange={changeFormHandler}
      />

      <SelectCategories
        label="Kategoria:"
        firstOption={{ name: 'wybierz', value: '' }}
        name="categoryId"
        onChange={changeFormHandler}
        required
      />

      <AddressInputFields
        findAddress={findAddress}
        form={form}
        changeFormHandle={(e) => {
          resetFindAddressHandler();
          changeFormHandler(e);
        }}
      />
    </form>
  )
}
