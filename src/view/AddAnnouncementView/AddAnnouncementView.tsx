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
import { SelectCategories } from '../../components/SelectCategories/SelectCategories'
import { AuctionLinkEntitySave } from 'types'

const initialAnnouncementFormState: AnnouncementForm = {
  title: '',
  description: '',
  price: 0,
  country: '',
  city: '',
  lat: 0,
  lon: 0,
  zipCode: '',
  street: '',
  buildingNumber: '',
  apartamentNumber: '',
  categoryId: '',
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

  const removeAuctionLinkHandler = (index: number) => {
    setAnnouncementForm(prev => {
      const newAuctionLinks = prev.auctionLinks.filter((e, i) => i !== index);
      return({
        ...prev,
        auctionLinks: newAuctionLinks,
      });
    });
  };

  const addAuctionLinkHandler = (link: AuctionLinkEntitySave) => {
    setAnnouncementForm(prev => ({
      ...prev,
      auctionLinks: [...prev.auctionLinks, link],
    }))
  }

  return (
    <section className="AddAnnouncementView">
      <UserMenuHeader title="Dodaj ogłoszenie" onClick={goBackHandler}/>

      <form id="announcement-form" className="AddAnnouncementView__form">
        <TitlePriceInputFields
          required
          form={announcementForm}
          changeFormHandle={changeFormHandler}
        />

        <LongTextInput
          required
          name="description"
          label="Opis:"
          maxLength={255}
          minLength={3}
        />

        <SelectCategories
          label="Kategoria:"
          firstOption={{ name: 'wybierz', value: '' }}
          required
        />

        <AddressInputFields
          form={announcementForm}
          changeFormHandle={changeFormHandler}
        />
      </form>

      <AuctionLinkInput
        form={announcementForm}
        removeAuctionLinkHandler={removeAuctionLinkHandler}
        addAuctionLinkHandler={addAuctionLinkHandler}
      />

      <Button type="submit" form="announcement-form">Dodaj</Button>
    </section>
  );
}
