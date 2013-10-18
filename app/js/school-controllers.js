'use strict';

/* Admin Controllers */

function SchoolController($scope,$resource){
        $scope.schools = {};
        $scope.school_statistics = {};
        
        $scope.get_schools = function(){
          //$scope.schools = $resource('/jsonapi/schools/SG').get(); 
          //Hardcoding local schools until format stabalizes
          $scope.schools = $resource('schools.json').get(); 
   
        };

        $scope.get_current_player_schools = function(){
          $scope.current_player_schools = $resource('/jsonapi/current_player_schools').get();        
        };

        $scope.get_school_statistics = function(){
          $scope.school_statistics = $resource('/jsonapi/school_statistics/SG').get();        
        };

        $scope.add_or_update_school = function(schoolID, year){
          
          $scope.SchoolResource = $resource('/jsonapi/add_or_update_school');

          var data = {"schoolID": schoolID,
                      "year": year};

          var item = new $scope.SchoolResource(data);
          item.$save(function(response) { 
                  $scope.response = response;
                  //Handle any errors
                  console.log(response);
                  $scope.get_current_player_schools();
                  
          }); 
          
        };

}