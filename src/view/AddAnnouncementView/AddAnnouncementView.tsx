import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './AddAnnouncementView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { AuctionLinkInput } from '../../components/form/AuctionLinkInput/AuctionLinkInput'
import { AnnouncementDto, CreateAnnouncementResponse, CreateAuctionLinkDto, ErrorResponse } from 'types'
import { checkAddressCoords } from '../../utils/check-address-coords'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useJwt } from '../../hooks/useJwt'
import { AnnouncementForm } from '../../components/form/AnnouncementForm/AnnouncementForm'
import { openNone, openUser } from '../../store/slices/app-slice'
import { useSetJwt } from '../../hooks/useSetJwt'
import { initialAnnouncementForm } from '../../components/form/AnnouncementForm/announcement-form-initial'
import { apiUrl } from '../../config'
import { LoadingSpinner } from '../../components/LoadingSpinner/LoadingSpinner'

export const AddAnnouncementView = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState<AnnouncementDto>(initialAnnouncementForm);
  const [findAddress, setFindAddress] = useState<undefined | Awaited<ReturnType<typeof checkAddressCoords>>>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const jwt = useJwt();
  const setJwt = useSetJwt();

  if(!setJwt) dispatch(openNone());

  useEffect(() => {
    if(newJwt) (setJwt as any)(newJwt);
  }, [newJwt]);

  const goBackHandler = () => {
    dispatch(openUser());
  }

  const changeFormHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setError(null);
    setMessage(null);
    setFindAddress(undefined);
    setNewJwt(null);

    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const removeAuctionLinkHandler = (index: number) => {
    setForm((prev: AnnouncementDto) => {
      const newAuctionLinks = prev.auctionLinks.filter((e, i) => i !== index);
      return({
        ...prev,
        auctionLinks: newAuctionLinks,
      });
    });
  };

  const addAuctionLinkHandler = (link: CreateAuctionLinkDto) => {
    setForm((prev) => ({
      ...prev,
      auctionLinks: [...prev.auctionLinks, link],
    }))
  }

  const resetFindAddressHandler = () => {
    setFindAddress(undefined);
  }

  const addAnnouncementApiCall = async (lat: number, lon: number) => {
    const data = await api<CreateAnnouncementResponse | ErrorResponse>(`${apiUrl}/announcement/`, {
      method: HttpMethods.POST,
      jwt: jwt,
      payload: { ...form, lat, lon: lon },
    });

    if(data.newJwt) setNewJwt(data.newJwt);

    if(data.status === 201) {
      setForm(initialAnnouncementForm);
      setMessage('Pomyślnie dodano ogłoszenie')
    }
    else setError((data.data as ErrorResponse)?.error || null);
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if(!findAddress) {
      const geoData = await checkAddressCoords({
        country: form.country,
        city: form.city,
        zipCode: form.zipCode,
        street: form.street || undefined,
        buildingNumber: form.buildingNumber || undefined,
        apartamentNumber: form.apartamentNumber || undefined,
      });

      if(geoData?.all) await addAnnouncementApiCall(geoData.lat, geoData.lon);
      else setFindAddress(geoData);
    } else await addAnnouncementApiCall(findAddress.lat, findAddress.lon);

    setLoading(false);
  }

  return (
    <section className="AddAnnouncementView">
      <UserMenuHeader title="Dodaj ogłoszenie" onClick={goBackHandler}/>

      <div className="AddAnnouncementView__container">
        {error && <p className="AddAnnouncementView__error">{error}</p>}
        {message && <p className="AddAnnouncementView__message">{message}</p>}

        <AnnouncementForm
          form={form}
          changeFormHandler={changeFormHandler}
          resetFindAddressHandler={resetFindAddressHandler}
          findAddress={findAddress}
          onSubmitHandler={(e) => {
            onSubmitHandler(e);
            setLoading(true);
          }}
          id="announcement-form"
        />

        <AuctionLinkInput
          form={form}
          removeAuctionLinkHandler={removeAuctionLinkHandler}
          addAuctionLinkHandler={addAuctionLinkHandler}
        />

        <Button type="submit" form="announcement-form">Dodaj ogłoszenie</Button>
      </div>
      {loading && <LoadingSpinner/>}
    </section>
  );
}
