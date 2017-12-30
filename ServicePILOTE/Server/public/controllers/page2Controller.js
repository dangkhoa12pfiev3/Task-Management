// view task already done
routingApp.controller('Page2Ctrl',['$scope','$filter','StorageService',function($scope,$filter,StorageService){
    
    $scope.load=function(){ 
        var taskList = StorageService.getTaskList();
        
        if(!taskList){
            StorageService.load(function(taskList){
                $scope.taskDoneList = $filter('filter')(taskList,{state:"done"});
                $scope.numberTaskDone = $scope.taskDoneList.length;
                StorageService.setTaskList(taskList);
            });
        }else{
            $scope.taskDoneList = $filter('filter')(taskList,{state:"done"});
            $scope.numberTaskDone = $scope.taskDoneList.length;
        }
        
        
    }

    $scope.load();

}]);
