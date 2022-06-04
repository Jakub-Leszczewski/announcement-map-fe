import React from 'react';
import './AdPopup.css'
import { AdInfo } from '../AdInfo/AdInfo'

interface Props {
  id: string[];
}

export const AdPopup = ({ id }: Props) => {
  console.log(id);
  return (
    <section className="AdPopup">
      {
        id.map((id) => (
          <AdInfo
            id={id}
            name={'name'}
            description={'description'}
            price={12}
            country={'country'}
            city={'city'}
            zipCode={'zipCode'}
            address={'address'}
            date={new Date()}
            links={[]}
          />
        ))
      }
    </section>
  )
}
