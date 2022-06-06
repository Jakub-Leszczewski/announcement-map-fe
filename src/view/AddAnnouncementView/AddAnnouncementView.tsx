import React, { ChangeEvent, useState } from 'react'
import './AddAnnouncementView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openUser } from '../../store/slices/app-slice'
import { AnnouncementForm } from '../../types/announcement-form'
import { TitlePriceInputFields } from '../../components/form/TitlePriceInputFields/TitlePriceInputFields'
import { LongTextInput } from '../../components/common/LongTextInput/LongTextInput'
import { AddressInputFields } from '../../components/form/AddressInputFields/AddressInputFields'
import { AuctionLinkInput } from '../../components/form/AuctionLinkInput/AuctionLinkInput'

const initialAnnouncementFormState: AnnouncementForm = {
  title: '',
  description: '',
  price: 0,
  country: '',
  city: '',
  zipCode: '',
  street: '',
  buildingNumber: '',
  apartamentNumber: '',
  auctionLinks: [],
}

export const AddAnnouncementView = () => {
  const dispatch = useDispatch();
  const [announcementForm, setAnnouncementForm] = useState<AnnouncementForm>(initialAnnouncementFormState);

  const goBackHandler = () => {
    dispatch(openUser(undefined));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnnouncementForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="AddAnnouncementView">
      <UserMenuHeader title="Dodaj ogłoszenie" onClick={goBackHandler}/>

      <form className="AddAnnouncementView__form">
        <TitlePriceInputFields
          required
          form={announcementForm}
          changeFormHandle={changeFormHandler}
        />

        <LongTextInput
          name="description"
          label="Opis:"
          maxLength={255}
          minLength={3}
        />

        <AddressInputFields
          form={announcementForm}
          changeFormHandle={changeFormHandler}
        />

        <AuctionLinkInput/>

        <Button
          width="100%"
          height={30}
          borderRadius="15px"
        >Dodaj</Button>
      </form>
    </section>
  );
}
