import React from 'react';

type Recipe = {
  title: string;
  image: string;
  category: string;
  source: string;
};

export const Card: React.FC<Recipe> = ({ title, image, category, source }) => {
  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <a href="#">
        <img src={image} alt="Photo" />
      </a>
      <p className="card__category">{category}</p>
      <a
        href={`${source}`}
        target="_blank"
        className="card__source"
        rel="noreferrer"
      >
        {source}
      </a>
    </div>
  );
};
