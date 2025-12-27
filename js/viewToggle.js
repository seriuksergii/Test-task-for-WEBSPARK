document.addEventListener('DOMContentLoaded', () => {
  const gridViewIcon = document.getElementById('gridViewIcon');
  const listViewIcon = document.getElementById('listViewIcon');
  const cardsList = document.getElementById('cardsList');
  const cardsGrid = document.getElementById('cardsGrid');

  const toggleView = (showGrid) => {
    cardsList.style.display = showGrid ? 'none' : 'flex';
    cardsGrid.style.display = showGrid ? 'grid' : 'none';
    gridViewIcon.classList.toggle('active', showGrid);
    listViewIcon.classList.toggle('active', !showGrid);
  };

  const handleKeyPress = (e, showGrid) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleView(showGrid);
    }
  };

  gridViewIcon.addEventListener('click', () => toggleView(true));
  listViewIcon.addEventListener('click', () => toggleView(false));

  gridViewIcon.addEventListener('keydown', (e) => handleKeyPress(e, true));
  listViewIcon.addEventListener('keydown', (e) => handleKeyPress(e, false));
});
