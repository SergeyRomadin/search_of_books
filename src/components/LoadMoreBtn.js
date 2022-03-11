const LoadMoreBtn = ({ books, getMoreBooks, viewBook }) => {
  if (books[1]) {
    if (!viewBook) {
      return <button onClick={getMoreBooks}>Load more...</button>;
    } else return null;
  } else return null;
};

export default LoadMoreBtn;

/// Остановился на кнопке LOAD MORE передача функции через пропсыьотщлтолдтолд
