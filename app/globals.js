'use strict';

angular.module('pool.globals', [])

.factory('GLOBALS', function() {
	return {
		pool_name: "$POOL_NAME",
		api_url : '$API_URL',
		api_refresh_interval: 5000,
		app_update_interval: 5*60000
	};
});
