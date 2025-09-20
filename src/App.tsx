import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
  REVERSE = 'REVERSE',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const sortedGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        return goods.sort((a, b) => a.localeCompare(b));

      case SortType.LENGTH:
        return goods.sort((a, b) => a.length - b.length || a.localeCompare(b));

      case SortType.REVERSE:
        return goods.reverse();

      case SortType.NONE:
      default:
        return goods;
    }
  }, [sortType]);

  const handleSortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setSortType(SortType.REVERSE);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info is-light ${
            sortType === SortType.ALPHABET ? 'is-active' : ''
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success is-light ${
            sortType === SortType.LENGTH ? 'is-active' : ''
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning is-light ${
            sortType === SortType.REVERSE ? 'is-active' : ''
          }`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger is-light ${
            sortType === SortType.NONE ? 'is-active' : ''
          }`}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
        <ul>
          <li data-cy="Good">Dumplings</li>
          <li data-cy="Good">Carrot</li>
          <li data-cy="Good">Eggs</li>
          <li data-cy="Good">Ice cream</li>
          <li data-cy="Good">Apple</li>
          <li data-cy="Good">...</li>
        </ul>
      </ul>
    </div>
  );
};
