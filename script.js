  // script.js


  // Initialize Algolia clients
  const client = algoliasearch('LF2MNJCP52', '7ac50008d4f9e058d0616e0f1e587c3b');

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
