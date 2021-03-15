'use strict';

app.controller('AltBlocksCtrl', function ($scope, $route, dataService, timerService) {
    $scope.blocks = {};
    $scope.selected = [];

    $scope.options = {
        page: 1,
        limit: 15
    }

    $scope.loadBlocks = function () {
        var params = angular.copy($scope.options);
        params.page -= 1;
        var urlParams = $.param(params)
        $scope.promise = dataService.getData("/pool/altblocks?" + urlParams, function (data) {
            $scope.blocks.global = data;
            updateMaturity();
        });
    };

    var updateMaturity = function () {
        if ($scope.poolStats.global !== undefined) {
            _.each($scope.blocks.global, function (block) {
                if ($scope.network && $scope.network.auxChains && $scope.config) {
                    const chain = $scope.network.auxChains.find((ch) => ch.id === 'xtr');
                    if (chain) {
                        block.maturity = $scope.config.maturity_depth - (chain.block_header.height - block.height);
                    }
                }

                block.luck = 100 - (block.shares / block.diff * 100);
                block.icon = (block.valid) ? 'done' : 'clear';
            });
        }
    }

    $scope.$watchGroup(["blocks.global", "poolStats.global"], updateMaturity);

    // Register call with timer
    timerService.register($scope.loadBlocks, $route.current.controller);
    $scope.loadBlocks();

    $scope.$on("$routeChangeStart", function () {
        timerService.remove($route.current.controller);
    });
});
