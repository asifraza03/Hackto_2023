  // script.js
  import dotenv from 'dotenv';
  dotenv.config(); 
  // Initialize Algolia clients
  const client = algoliasearch(process.env.API_KEY, process.env.SEARCH_ONLY_API_KEY);

  // Initialize Algolia index
  const index = client.initIndex('new_data');

  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Function to perform the search
  function performSearch(query) {
    // Clear previous results
    searchResults.innerHTML = '';

    // Perform the search
    index
      .search(query)
      .then(({ hits }) => {
        // Display the search results
        hits.forEach(hit => {
          const li = document.createElement('li');
          li.textContent = hit.name; // Assuming your product data has a 'name' attribute
          searchResults.appendChild(li);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  // Event listener for search input
  searchInput.addEventListener('input', () => {
    performSearch(searchInput.value);
  });
