import React from 'react';
import './AdInfo.css'

interface Props {

}

export const AdInfo = ({}: Props) => {
  return (
    <section className="AdInfo">
      <header className="AdInfo__header">
        <h3>Nazwa Produktu</h3>
        <p>10.23zł</p>
      </header>
      <p className="AdInfo__id">id: nakjdnaskn3uioh4892jdsoiamf093j20jdoa</p>

      <p className="AdInfo__address">Krosno 38-400 Magurów 3/8</p>
      <p className="AdInfo__description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur consequuntur deserunt, dolores dolorum id illo, in ipsum iste iusto laudantium nemo neque nobis odit quam soluta temporibus vero. Consequuntur, nesciunt.</p>
      <div className="AdInfo__link-container">
        <a href="">Allegro</a>
        <a href="">Olx</a>
      </div>
      <p className="AdInfo__date">05.01.2022</p>
    </section>
  )
}
