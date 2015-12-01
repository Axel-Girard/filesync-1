'use strict';
angular
  .module('FileSync')
  .controller('SocialCtrl', ['$scope', 'SocketIOService', function($scope, SocketIOService) {
    this.viewers = [];
    this.messages = [];
    this.message = '';
    this.directory = '';
    this.nickname = '';

  function onViewersUpdated(viewers) {
    this.viewers = [];
    for(var i = 0; i < viewers.length; i++){
      this.viewers.push({name: String(viewers[i]), value: false});
    }
    $scope.$apply();
  }

  function onViewerName(nickname) {
    if(this.nickname === ''){
      this.nickname = nickname;
    }
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

  this.changePath = function(){
      SocketIOService.directoryUpdated(this.directory);
      this.directory = '';
  }

  this.sendFiles = function() {
    var names = [];
    var j = 0;
    for(var i = 0; i < this.viewers.length; i++){
      if(this.viewers[i].value === true){
        names[j] = this.viewers[i].name;
        j++;
      }
    }
    SocketIOService.sendFiles({names : names, dir: this.directory});
    this.directory = '';
  }

    SocketIOService.onViewersUpdated(onViewersUpdated.bind(this));
    SocketIOService.onViewerName(onViewerName.bind(this));
    SocketIOService.onMessagesUpdated(onMessagesUpdated.bind(this));
  }]);
