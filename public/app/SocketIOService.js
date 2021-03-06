'use strict';
angular.module('FileSync')
  .factory('SocketIOService', ['io', '_', '$timeout', function(io, _, $timeout) {
    var socket = io();
    var _onFileChanged = _.noop;
    var _onVisibilityStatesChanged = _.noop;

    socket.on('connect', function() {
      console.log('connected');
      var login = prompt('Nickname?');
      socket.emit('viewer:new', login);
    });

    socket.on('file:changed', function(filename, timestamp, content) {
      $timeout(function() {
        _onFileChanged(filename, timestamp, content);
      });
    });

    socket.on('file:foo', function(names, filename, timestamp, content) {
      // The fonction need to sort user, but I don't know how to do this
      $timeout(function() {
        _onFileChanged(filename, timestamp, content);
      });
    });

    socket.on('users:visibility-states', function(states) {
      $timeout(function() {
        _onVisibilityStatesChanged(states);
      });
    });

    socket.on('error:auth', function(err) {
      // @todo yeurk
      alert(err);
    });

    return {
      onViewersUpdated: function(f) {
        socket.on('viewers:updated', f);
      },

      onViewerName: function(f) {
        socket.on('viewer:name', f);
      },

      onMessagesUpdated: function(f){
        socket.on('social:message', f);
      },

      onFileChanged: function(f) {
        _onFileChanged = f;
      },

      onVisibilityStatesChanged: function(f) {
        _onVisibilityStatesChanged = f;
      },

      userChangedState: function(state) {
        socket.emit('user-visibility:changed', state);
      },

      messageUpdated: function(f) {
        socket.emit('message:send', f);
      },

      directoryUpdated: function(f) {
        socket.emit('directory:change', f);
      },

      sendFiles: function(data) {
        socket.emit('files:send', data);
      }
    };
  }]);
