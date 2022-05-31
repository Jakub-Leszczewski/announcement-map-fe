import React from 'react';
import './AdPopup.css'
import { AdInfo } from '../AdInfo/AdInfo'

interface Props {

}

export const AdPopup = ({}: Props) => {
  return (
    <section className="AdPopup">
      <AdInfo/>
    </section>
  )
}
