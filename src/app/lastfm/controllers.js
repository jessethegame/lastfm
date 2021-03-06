angular.module('lastfm.controllers')

.controller( 'FriendCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.friends = new Collection({
    resource: lastfm.api.user.getFriends,
    page: {
      limit: 20
    },
    params: {
      user: $stateParams.user,
      recenttracks: 1
    }
  });
})

.controller( 'ScrobbleCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.tracks = new Collection({
    resource: lastfm.api.user.getRecentTracks,
    page: {limit: 10},
    params: {
      user: $stateParams.user,
      extended: 1
    }
  });
})

.controller( 'UserCtrl', function UserCtrl ( $scope, $state, $stateParams, lastfm) {
  $scope.user = {name: $stateParams.user};
  lastfm.api.user.getInfo({
      user: $stateParams.user,
  }, {
      success: function (data) {
          console.log('DATATATA', data);
          $scope.user = data;
      }
  });

  $scope.secondaryNav = [
    {
      slug: 'library',
      name: 'Library',
    },
    {
      slug: 'friends',
      name: 'Friends',
    },
    {
      slug: 'tracks',
      name: 'Tracks',
    },
  ]

  $scope.isUserState = function (name) {
    return $state.includes('user.' + name);
  }
})

.controller( 'ArtistCtrl', function ArtistCtrl ( $scope, $state, $stateParams, lastfm, Collection) {
  $scope.artist = {name: $stateParams.artist};

  lastfm.api.artist.getInfo({
      artist: $stateParams.artist
  }, {
      success: function (data) {
         $scope.artist = data;
      }
  });

  $scope.secondaryNav = [
    {
      slug: 'tracks',
      name: 'Tracks',
    },
    {
      slug: 'albums',
      name: 'Albums',
    }
  ];

  $scope.topTracks = new Collection({
      resource: lastfm.api.artist.getTopTracks,
      page: {
        limit: 15
      },
      params: {
          artist: $stateParams.artist,
          period: 'overall'
      }
  });

  $scope.$watch('topTracks.data[1]', function (tracks) {
    if (!tracks) {
      return;
    }
    tracks.sort(function (x, y) {
      return y.playcount - x.playcount;
    });
    var i;
    for (i = 0; i < tracks.length; i++) {
      tracks[i].rank = i + 1;
    }
  });

})

.controller( 'ArtistTopTrackCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.tracks = new Collection({
      resource: lastfm.api.artist.getTopTracks,
      page: {
        limit: 15
      },
      params: {
          user: $stateParams.artist,
          period: 'overall'
      }
  });


})


.controller( 'LibraryArtistCtrl', function ($scope, $stateParams, lastfm, Collection) {
    $scope.artists = new Collection({
        resource: lastfm.api.library.getArtists,
        page: {
            limit: 18,
        },
        params: {
            user: $stateParams.user,
            sortBy: 'plays',
            sortOrder: 'desc'
        }
    });
})

.controller( 'LibraryLoveCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.tracks = new Collection({
      resource: lastfm.api.user.getLovedTracks,
      page: {
        limit: 50,
      },
      params: {
          user: $stateParams.user,

          //Sadly, these paramters are not available in the public api.
          sortBy: 'plays',
          sortOrder: 'desc'
      }
  });

  // This watcher resets the Collection whenever query parameters change.
  $scope.$watch('tracks.params', function () {
      //$scope.tracks.reset();
  }, true);

})

.controller( 'UserTopArtistCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.artists = new Collection({
      resource: lastfm.api.user.getTopArtists,
      page: {
        limit: 15
      },
      params: {
          user: $stateParams.user,
          period: 'overall'
      }
  });
})

.controller( 'UserTopTrackCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.tracks = new Collection({
      resource: lastfm.api.user.getTopTracks,
      page: {
        limit: 15
      },
      params: {
          user: $stateParams.user,
          period: 'overall'
      }
  });
})

.controller( 'TrackCtrl', function ($scope, $stateParams, lastfm, Collection) {
  $scope.tracks = new Collection({
      resource: lastfm.api.user.getRecentTracks,
      page: {
        limit: 50
      },
      params: {
          user: $stateParams.user,
          extended: 1
      }
  });
})

;

