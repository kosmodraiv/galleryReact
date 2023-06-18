import React, { useEffect, useState } from 'react';
import { Collection } from './Collection';
import './index.scss';
import { AddPhoto } from './components/AddPhoto/AddPhoto';

const cats = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' }
];

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId ? `category=${categoryId}` : '';

    fetch(
      `https://644e81781b4567f4d5896097.mockapi.io/catalogphoto/photos?${category}`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
        setTotalPages(Math.ceil(json.length / 3));
      })
      .catch((err) => {
        console.warn(err);
        alert('Данные не найдены');
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const filteredCollections = collections.filter((obj) =>
    obj.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  const startIndex = (page - 1) * 3;
  const visibleCollections = filteredCollections.slice(startIndex, startIndex + 3);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading..</h2>
        ) : (
          visibleCollections.map((obj, index) => (
            <Collection key={index} name={obj.name} images={obj.photos} />
          ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <li
            onClick={() => handlePageChange(index + 1)}
            className={page === index + 1 ? 'active' : ''}
            key={index + 1}
          >
            {index + 1}
          </li>
        ))}
      </ul>
      <AddPhoto categories={cats} />
    </div>
  );
}

export default App;
