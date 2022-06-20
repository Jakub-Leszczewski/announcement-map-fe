import React, { Fragment } from 'react'
import './AdPopup.css'
import { AnnouncementInfo } from '../AnnouncementInfo/AnnouncementInfo'

interface Props {
  id: string[];
}

export const AdPopup = ({ id }: Props) => {
  return (
    <section className="AdPopup">
      {
        id.map((id) => (
          <Fragment key={id}>
            <AnnouncementInfo
              id={id}
              fetchData={true}
            />
            <hr/>
          </Fragment>

        ))
      }
    </section>
  )
}
