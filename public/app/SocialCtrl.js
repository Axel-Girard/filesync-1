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

  function onMessagesUpdated(messages) {
    this.messages = messages;
    $scope.$apply();
  }

  this.sendMessage = function() {
    this.messages.push(this.message);
   	SocketIOService.messageUpdated(this.message);
    this.message = '';
   }

    SocketIOService.onViewersUpdated(onViewersUpdated.bind(this));
    SocketIOService.onMessagesUpdated(onMessagesUpdated.bind(this));
  }]);
