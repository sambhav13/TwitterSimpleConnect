/*
@author : Dave Lamarre
*/
$(document).ready(function() {

		var $container	= $('#tweets'),
			tweets;

		function pullTwitter($searchField) {
			$.getJSON('http://search.twitter.com/search.json?callback=?&q=' + $searchField, response);
		}

		function response(result) {
			if (result.results.length < 1) {
				console.log("Nothing Found!");
				return;
			}

			tweets = $.map(result.results, function(tweet) {
				return {
					id: tweet.id_str,
					text: tweet.text, 
					avatar: tweet.profile_image_url, 
					user: tweet.from_user
				};
			});

			renderTweets();
		}

		function renderTweets() {
			$container.empty();
			for (var i = 0; i < tweets.length; i++) {
				var tweet	= tweets[i];

				var html = '<div class="tweet">';
				html +=  '<div class="tweet_avatar"><img src="' + tweet.avatar + '" /></div>';
				html +=  '<div class="tweet_text">' + tweet.text + '</div>';
				html +=  '<div class="tweet_user">#' + tweet.user + '</div>';
				html += '</div>';

				$container.append($(html));
			};
		}
		
		// CALL THIS FUNCTION DIRECTLY FROM YOUR API.
		pullTwitter("nurunToronto");
});

