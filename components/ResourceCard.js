import React from 'react';
import Link from 'next/link';


export default function ResourceCard({ image, title, description, detail1, description2, detail2, link, buttonText = "Click Here" }) {
 
  return (
    <div className="card">
      {image && (
        <img src={image} alt={title} className="card-image" />
      )}
      <div className="card-content">
        <div>
          <p className="card-descripti">{description}</p>
           {/* <h2 className="card-tit">{detail1}</h2>
          <p className="card-descrip">{description2}</p>
           <h2 className="card-tit">{detail2}</h2> */}

        </div>
        <Link href={link} className='card-button'>{ buttonText}</Link>
      </div>
    </div>
  );
}
