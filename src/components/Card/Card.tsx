import React from 'react';

type Recipe = {
  title: string;
  category: string;
  source: string;
};

export const Card: React.FC<Recipe> = ({ title, category, source }) => {
  return (
    <div className="card">
      <h2 className="card__title">{title}</h2>
      <p className="card__category">{category}</p>
      <a href={`{${source}}`} className="card__sourse"></a>
    </div>
  );
};
