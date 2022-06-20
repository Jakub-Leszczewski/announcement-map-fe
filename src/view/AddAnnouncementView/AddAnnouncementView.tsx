import React, { ChangeEvent, FormEvent, useState } from 'react'
import './AddAnnouncementView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openUser } from '../../store/slices/app-slice'
import { TitlePriceInputFields } from '../../components/form/TitlePriceInputFields/TitlePriceInputFields'
import { LongTextInput } from '../../components/common/LongTextInput/LongTextInput'
import { AddressInputFields } from '../../components/form/AddressInputFields/AddressInputFields'
import { AuctionLinkInput } from '../../components/form/AuctionLinkInput/AuctionLinkInput'
import { SelectCategories } from '../../components/SelectCategories/SelectCategories'
import { CreateAnnouncementDto, CreateAuctionLinkDto } from 'types'
import { checkAddressCoords } from '../../utils/check-address-coords'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useJwt } from '../../hooks/useJwt'

const initialAnnouncementFormState: CreateAnnouncementDto = {
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
  const jwt = useJwt();
  const [announcementForm, setAnnouncementForm] = useState<CreateAnnouncementDto>(initialAnnouncementFormState);
  const [findAddress, setFindAddress] = useState<undefined | Awaited<ReturnType<typeof checkAddressCoords>>>(undefined);

  const goBackHandler = () => {
    dispatch(openUser(undefined));
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const addAuctionLinkHandler = (link: CreateAuctionLinkDto) => {
    setAnnouncementForm((prev) => ({
      ...prev,
      auctionLinks: [...prev.auctionLinks, link],
    }))
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const geoData = await checkAddressCoords({
      country: announcementForm.country,
      city: announcementForm.city,
      zipCode: announcementForm.zipCode,
      street: announcementForm.street || undefined,
      buildingNumber: announcementForm.buildingNumber || undefined,
    });

    if(geoData && geoData.all) {
      const data = await api('http://localhost:3001/api/announcement/', {
        method: HttpMethods.POST,
        jwt: jwt,
        payload: { ...announcementForm, lat: geoData.lat, lon: geoData.lon },
      });
    } else if (geoData && !geoData.all){
      console.log(geoData)
    }
    setFindAddress(geoData);
  }

  return (
    <section className="AddAnnouncementView">
      <UserMenuHeader title="Dodaj ogłoszenie" onClick={goBackHandler}/>

      <form onSubmit={onSubmitHandler} id="announcement-form" className="AddAnnouncementView__form">
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
          onChange={changeFormHandler}
        />

        <SelectCategories
          label="Kategoria:"
          firstOption={{ name: 'wybierz', value: '' }}
          name="categoryId"
          onChange={changeFormHandler}
          required
        />

        {findAddress === null ? <p className="AddAnnouncementView__error">Podany adres jest błędny</p> : null}
        {
          findAddress && !findAddress.all
            ? <p className="AddAnnouncementView__info">
                Nie znaleziono dokładnego adresu. Najbliższy adres wyświetlany na mapie to:
                <strong>
                  {` ${announcementForm.country} ${announcementForm.city} ${announcementForm.zipCode} ${findAddress.street || ''}`}
                </strong>.
                <br/>
                W treści ogłoszenia będzie widoczny adres wpisany przez ciebie. Zaakceptuj klikając Dodaj lub zmień adres.
              </p>
            : null
        }
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
