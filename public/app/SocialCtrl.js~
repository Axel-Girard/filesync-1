'use strict';
angular
  .module('FileSync')
  .controller('SocialCtrl', ['$scope', 'SocketIOService', function($scope, SocketIOService) {
    this.viewers = [];
    this.messages = [];
    this.message = '';

	function onViewersUpdated(viewers) {
      this.viewers = viewers;
      $scope.$apply();
    }

    function sendMessage (message) {
    	SocketIOService.updateMessage(message);
    }

    SocketIOService.onViewersUpdated(onViewersUpdated.bind(this));
  }]);
