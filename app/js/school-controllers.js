'use strict';

/* Admin Controllers */

function SchoolController($scope,$resource){
        $scope.schools = {};
        $scope.school_lookup = {};
        $scope.school_statistics = {};
        
        $scope.get_schools = function(){
          
          $resource('/jsonapi/schools/SG').get({},function(response){
              $scope.schools = response;
              //Create an easy lookup table to get school data by id.
              for(var i=0; i<$scope.schools.Secondary.length; i++){
                $scope.school_lookup[$scope.schools.Secondary[i].id] = $scope.schools.Secondary[i];
              }
              for(var i=0; i<$scope.schools.Tertiary.length; i++){
                $scope.school_lookup[$scope.schools.Tertiary[i].id] = $scope.schools.Tertiary[i];
              }
              for(var i=0; i<$scope.schools.University.length; i++){
                $scope.school_lookup[$scope.schools.University[i].id] = $scope.schools.University[i];
              }
          }); 
           
        };

        $scope.get_current_player_schools = function(){
          
          $resource('/jsonapi/current_player_schools').get({},function(response){
            $scope.current_player_schools = response;
            $scope.secondaryID = $scope.current_player_schools.Secondary.id;
            $scope.secondary_start_year = $scope.current_player_schools.Secondary.year;
            //Set tertiary and university dropdowns if available
          });        
        };

        $scope.get_school_registrations = function(){
          //Interate through the list and count entries of each type.  
          //You can fetch by offset to lengthen the list.
          $scope.total_registrations =0;
          $scope.registrations_by_schooltype = {};
          $scope.registrations_by_subtype = {};
          $scope.registrations_by_school = {};

          $resource('/jsonapi/school_registration').query({}, function(response){
            $scope.school_registrations = response;
            for(var i=0; i<$scope.school_registrations.length; i++){
              $scope.total_registrations +=1;
              //Total by schooltype
              if($scope.registrations_by_schooltype[$scope.school_registrations[i].schooltype]){
                  $scope.registrations_by_schooltype[$scope.school_registrations[i].schooltype] +=1;
              }
              else {
                  $scope.registrations_by_schooltype[$scope.school_registrations[i].schooltype] =1;
              }
              //Total by subtype
              if($scope.registrations_by_subtype[$scope.school_registrations[i].subtype]){
                  $scope.registrations_by_subtype[$scope.school_registrations[i].subtype] +=1;
              }
              else {
                  $scope.registrations_by_subtype[$scope.school_registrations[i].subtype] =1;
              } 
              //Total by school
              if($scope.registrations_by_school[$scope.school_registrations[i].school]){
                  $scope.registrations_by_school[$scope.school_registrations[i].school] +=1;
              }
              else {
                  $scope.registrations_by_school[$scope.school_registrations[i].school] =1;
              } 
                           

            }

          });
          
          

        };

        $scope.add_or_update_school = function(schoolID, year){
          
          $scope.SchoolResource = $resource('/jsonapi/school_registration');

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