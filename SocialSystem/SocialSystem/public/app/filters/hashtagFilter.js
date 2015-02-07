app.filter("hashtagFilter", function() { 

  return function(input, currentFilters) { 

	   var createQueryParameters = function(currentFilters, newFilter) {
	   		var queryParam = '',
	   			allFilters = [],
	   			filtersCount = currentFilters.length,
	   			i;

	   		for (i = 0; i < filtersCount; i++) {
	   			allFilters.push(currentFilters[i]);
	   		}

	   		allFilters.push(newFilter);

	   		for (i = 0; i < filtersCount + 1; i++) {
	   			if (i > 0) {
	   				queryParam += '&';
	   			}

	   			queryParam = queryParam + 'filters=' + allFilters[i];
	   		}

	   		return queryParam;
	   };

	   var containsFilter = function(currentFilters, newFilter) {
	   		var filtersCount = currentFilters.length,
	   			i;
	   		for (i = 0; i < filtersCount; i++) {
	   			if (currentFilters[i] === newFilter) {
	   				return true;
	   			}
	   		}

	   		return false;
	   };

  		var words = input.split(' '),
  			wordsCount = words.length,
  			i,
  			finalText = '';

  		for (i = 0; i < wordsCount; i++) {
  			if (i > 0) {
  				finalText += ' ';
  			}

  			var word = words[i];
  			if (word.length > 1 && word[0] === '#') {
  				var wordWithoutHash = word.split('#')[1];

  				if(!containsFilter(currentFilters, wordWithoutHash)) {
	  				var queryParams = createQueryParameters(currentFilters, wordWithoutHash),
	  				    url = '<a href="/#/newsfeed?' + queryParams + '">' + word + "</a>";

	  				finalText += url; 
	  			} else {
	  				var url = '<a>' + word + '</a>';

	  				finalText += url;
	  			}
  			} else {
  				finalText += word;
  			}
  		}

  		return finalText;
  };
});