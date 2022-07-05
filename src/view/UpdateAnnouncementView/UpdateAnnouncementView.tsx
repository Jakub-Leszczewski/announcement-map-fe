import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import './UpdateAnnouncementView.css'
import { Button } from '../../components/common/Button/Button'
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch, useSelector } from 'react-redux'
import { AuctionLinkInput } from '../../components/form/AuctionLinkInput/AuctionLinkInput'
import { AnnouncementDto, CreateAnnouncementResponse, CreateAuctionLinkDto, ErrorResponse, GetAnnouncementResponse } from 'types'
import { checkAddressCoords } from '../../utils/check-address-coords'
import { api } from '../../utils/api/api'
import { HttpMethods } from '../../types/http-methods'
import { useJwt } from '../../hooks/useJwt'
import { AnnouncementForm } from '../../components/form/AnnouncementForm/AnnouncementForm'
import { openAnnouncement } from '../../store/slices/app-slice'
import { useSetJwt } from '../../hooks/useSetJwt'
import { StoreType } from '../../store'
import { useApiAuth } from '../../hooks/useApiAuth'
import { initialAnnouncementForm } from '../../components/form/AnnouncementForm/announcement-form-initial'
import { apiUrl } from '../../config'

export const UpdateAnnouncementView = () => {
  const dispatch = useDispatch();
  const announcementId = useSelector((store: StoreType) => store.app.announcementUpdatePayload);
  const [form, setForm] = useState<AnnouncementDto>(initialAnnouncementForm);
  const [findAddress, setFindAddress] = useState<undefined | Awaited<ReturnType<typeof checkAddressCoords>>>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [newJwt, setNewJwt] = useState<string | null>(null);

  const [loading, status, data] = useApiAuth<GetAnnouncementResponse>(
    `${apiUrl}/announcement/${announcementId}`
  );

  const jwt = useJwt();
  const setJwt = useSetJwt();

  if(!setJwt) return null;

  useEffect(() => {
    if(newJwt) setJwt(newJwt);
  }, [newJwt]);

  useEffect(() => {
    if(!loading && status === 200 && data) {
      setForm({
        ...data as GetAnnouncementResponse,
        street: (data as GetAnnouncementResponse).street ?? '',
        buildingNumber: (data as GetAnnouncementResponse).buildingNumber ?? '',
        apartamentNumber: (data as GetAnnouncementResponse).apartamentNumber ?? '',
      });
    }
  }, [loading])

  const goBackHandler = () => dispatch(openAnnouncement(announcementId));

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

  const resetFindAddressHandler = () => setFindAddress(undefined);

  const updateAnnouncementApiCall = async (lat: number, lon: number) => {
    const data = await api<CreateAnnouncementResponse | ErrorResponse>(
      `${apiUrl}/announcement/${announcementId}`,
      {
        method: HttpMethods.PATCH,
        jwt: jwt,
        payload: { ...form, lat, lon },
      }
    );

    if(data.newJwt) setNewJwt(data.newJwt);

    if(data.status === 200) setMessage('Pomyślnie zapisano.');
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

      if(geoData?.all) await updateAnnouncementApiCall(geoData.lat, geoData.lon);
      else setFindAddress(geoData);
    } else await updateAnnouncementApiCall(findAddress.lat, findAddress.lon);
  }

  return (
    <section className="AddAnnouncementView">
      <UserMenuHeader title="Aktualizuj ogłoszenie" onClick={goBackHandler}/>

      {error && <p className="AddAnnouncementView__error">{error}</p>}
      {message && <p className="AddAnnouncementView__message">{message}</p>}

      <AnnouncementForm
        form={form}
        changeFormHandler={changeFormHandler}
        resetFindAddressHandler={resetFindAddressHandler}
        findAddress={findAddress}
        onSubmitHandler={onSubmitHandler}
        id="announcement-form"
      />

      <AuctionLinkInput
        form={form}
        removeAuctionLinkHandler={removeAuctionLinkHandler}
        addAuctionLinkHandler={addAuctionLinkHandler}
      />

      <Button type="submit" form="announcement-form">Zapisz</Button>
    </section>
  );
}
