/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
	/* This is our first test suite - a test suite just contains
	 * a related set of tests. This suite is all about the RSS
	 * feeds definitions, the allFeeds variable in our application.
	 */
	describe('RSS Feeds', function () {
		/* This is our first test - it tests to make sure that the
		 * allFeeds variable has been defined and that it is not
		 * empty. Experiment with this before you get started on
		 * the rest of this project. What happens when you change
		 * allFeeds in app.js to be an empty array and refresh the
		 * page?
		 */
		it('are defined', function () {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		/* This test loops through all feeds and checks if the url
		 * is defined and it is not empty by checking its
		 * length property.
		 */
		
		describe('All feeds', function () {
			it('have URL and they are not empty', function () {
				allFeeds.forEach(function (feed) {
					expect(feed.url).toBeDefined();
					expect(feed.url.length).not.toBeLessThan(0);
				});
			});
		});

		/* This test loops through all feeds and checks if their names
		 * are defined and theyr are not empty by checking their
		 * length property.
		 */
		
		describe('The feeds', function () {
			it('have their names and they are not empty', function () {
				allFeeds.forEach(function (feed) {
					expect(feed.name).toBeDefined();
					expect(feed.name.length).not.toBeLessThan(0);
				});
			});
		});

	});


	/* This is a test that tests the functionality of the hamburger menu
	* which is in the top left corner of the page. The menu is hidden by
	* default and user has to click on it to see the list of feeds.
	*/
	

	describe('The menu', function () {

		/* This test ensures that the menu is hidden by default,
		 * when the page loads. The body should have a class named 
		 * 'menu-hidden'. 
		 */

		it('is hidden by default', function () {
			expect($(document.body).hasClass('menu-hidden')).toEqual(true);
		});

		/* This test ensures that menu shows up when the menu icon
		 * is clicked and dissapears when it is clicked again.
		 */

		it('menu changes visibility when the menu icon is clicked', function () {

			$('.menu-icon-link').click();
			expect($(document.body).hasClass('menu-hidden')).toEqual(false);
			$('.menu-icon-link').click();
			expect($(document.body).hasClass('menu-hidden')).toEqual(true);
		});

	});

	/* This test ensures that when the feed loads
	*  there is at least one link to an article.
	*/

	describe('Initial Entries', function () {
				
		/* This test runs after the feed is loaded.
		 * It ensures that feed contains at least one article.
		 */

		beforeEach(function (done) {
			loadFeed(0, function () {
				done();
			});
		});

		it('are loaded', function (done) {
			var entry = document.querySelector('.entry');
			expect(entry.length).not.toBeLessThan(1);
			done();
		});
	});

	describe('New Feed Selection', function () {

	/* This test ensures that after the first and
	 * the second feed is loaded, their content is
	 * different from each other.
	 */
		let oldFeed;
		let newFeed;
		
		beforeEach(function (done) {
			loadFeed(0, function () {
				oldFeed = document.querySelector('.feed').innerHTML;
			});
							
			loadFeed(1, function () {
				newFeed = document.querySelector('.feed').innerHTML;
				done();
			});

		});
		
		it('content changes when a new feed is loaded', function(done) {

			expect(oldFeed).not.toBe(newFeed);
			done();
		});
		
	});

}());


