// view todo task
routingApp.controller('Page3Ctrl',['$scope','$filter','StorageService',function($scope,$filter,StorageService){
    
    $scope.load=function(){ 
        var taskList = StorageService.getTaskList();
        if(!taskList){
            StorageService.load(function(taskList){
                $scope.taskleftList = $filter('filter')(taskList,{state:"todo"});
                $scope.numberTaskleft = $scope.taskleftList.length;
                StorageService.setTaskList(taskList);
            });
        } else{
            $scope.taskleftList = $filter('filter')(taskList,{state:"todo"});
            $scope.numberTaskleft = $scope.taskleftList.length;  
        }  
        
       
    }

    $scope.load();

}]);
