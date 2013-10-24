'use strict';

/* Admin Controllers */

function SchoolController($scope,$resource){
        $scope.schools = {};
        $scope.school_lookup = {};
        $scope.school_statistics = {};
        $scope.filtered_registrations = [];
        $scope.filtered_count = {};
        
        $scope.filter_year = "ALL";
        $scope.filter_schooltype = "ALL";
        $scope.filter_subtype = "ALL";
        $scope.filter_school = "ALL";
        
        $scope.supported_years = ["ALL",2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015];
        $scope.supported_schooltypes = ['ALL','Secondary','Tertiary','University'];
        $scope.supported_subtypes = ['ALL','JC','Poly'];
        $scope.supported_schools = [];//[{"id":"ALL","name":"ALL"},{"id":1,"name":"A"},{"id":2,"name":"B"}];

        $scope.update_supported = function(){
            //Run this on any select change events.
            $scope.filtered_registrations = [];
            $scope.filtered_total = 0;
            $scope.filtered_count = {};
        
            for(var i=0; i<$scope.school_registrations.length; i++){
              if ($scope.filter_schooltype == "ALL" || $scope.filter_schooltype==$scope.school_registrations[i].schooltype){
                if ($scope.filter_subtype == "ALL" || $scope.filter_subtype==$scope.school_registrations[i].subtype){
                  if ($scope.filter_year == "ALL" || $scope.filter_year==$scope.school_registrations[i].year){
                    if ($scope.filter_school == "ALL" || $scope.filter_school==$scope.school_registrations[i].school){
                        //Update the total
                        $scope.filtered_total +=1;
                        //Create an object from current settings and use as the accumulation key. 
                        //Later we'll recover the object from the key string. 
                        var theKey = {'schooltype':$scope.school_registrations[i].schooltype,
                                  'subtype':$scope.school_registrations[i].subtype,
                                  'year':$scope.school_registrations[i].year,
                                  'school':$scope.school_registrations[i].school
                                  }
                        theKey = JSON.stringify(theKey);
                        if($scope.filtered_count[theKey]){
                            $scope.filtered_count[theKey] += 1;
                            //console.log("adding to key "+JSON.stringify($scope.school_registrations[i]));
                        }
                        else{
                            //Create a new key to track
                            $scope.filtered_count[theKey] = 1;
                            //console.log("the key "+JSON.stringify($scope.school_registrations[i]));
                        }
                        //$scope.filtered_registrations.push($scope.school_registrations[i]);
                        
                    }
                  }
                }
              }
            }
            //Convert the object to a list to create the table
            for (var key in $scope.filtered_count) { 
              if ($scope.filtered_count.hasOwnProperty(key)) {
                  //Add counts to filtered_registrations
                  var myData = JSON.parse(key);
                  var entry = {"school":myData.school,"schooltype":myData.schooltype,"subtype":myData.subtype,"count":$scope.filtered_count[key],"year":myData.year} 
                  $scope.filtered_registrations.push(entry);      
              }
            }
        };

        $scope.get_schools = function(){
          
          $resource('/jsonapi/schools/SG').get({},function(response){
              $scope.schools = response;

              $scope.supported_schools = $scope.schools.Secondary.concat($scope.schools.Tertiary).concat($scope.schools.University);
              $scope.supported_schools.push({"id":"ALL","name":"ALL"});

              //Create an easy lookup table to get school data by id.
              for(var i=0; i<$scope.supported_schools.length; i++){
                $scope.school_lookup[$scope.supported_schools[i].id] = $scope.supported_schools[i];
              }

          }); 
           
        };

        $scope.get_current_player_schools = function(){
          
          $resource('/jsonapi/current_player_schools').get({},function(response){
            $scope.current_player_schools = response;
            if($scope.current_player_schools.Secondary){
              $scope.secondaryID = $scope.current_player_schools.Secondary.school;
              $scope.secondary_start_year = $scope.current_player_schools.Secondary.year;
            }
            if($scope.current_player_schools.Tertiary){
              $scope.tertiaryID = $scope.current_player_schools.Tertiary.school;
              $scope.tertiary_start_year = $scope.current_player_schools.Tertiary.year;
            }
            if($scope.current_player_schools.University){
              $scope.universityID = $scope.current_player_schools.University.school;
              $scope.university_start_year = $scope.current_player_schools.University.year;
            }
            
          });        
        };

        $scope.get_school_registrations = function(){
          //Interate through the list and count entries of each type.  
          //You can fetch by offset to lengthen the list.
          $scope.total_registrations =0;
          $scope.registrations_by_schooltype = {};
          $scope.registrations_by_subtype = {};
          $scope.registrations_by_school = {};
          $scope.registrations_by_year = {};

          $resource('/jsonapi/school_registration').query({}, function(response){
            //You can make this recursive to fetch additional records at an offset
            $scope.school_registrations = response;
            for(var i=0; i<$scope.school_registrations.length; i++){
              $scope.update_supported();
              //Most of this below may not longer be needed. 
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
              //Total by year
              if($scope.registrations_by_year[$scope.school_registrations[i].year]){
                  $scope.registrations_by_year[$scope.school_registrations[i].year] +=1;
              }
              else {
                  $scope.registrations_by_year[$scope.school_registrations[i].year] =1;
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