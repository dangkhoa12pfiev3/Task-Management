// CRUD operation: view, add, modify or delete task
routingApp.controller('Page1Ctrl',['$scope','$http','$filter','StorageService',function($scope,$http,$filter,StorageService){
    
    $scope.load=function(){
        
        StorageService.load(function(taskList){
            $scope.taskList = taskList;
            $scope.numberTask = $scope.taskList.length;
            StorageService.setTaskList(taskList);
        });
        console.log(StorageService.getTaskList());
        // $scope.taskList = StorageService.getTaskList();
        // $scope.numberTask = $scope.taskList.length;
    }

    $scope.addTask = function(){
        var idUser = sessionStorage.getItem("idUser");
        var task = $scope.taskName;
        
        var url = "https://localhost:443/add";

        $http({
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: url,
            data: JSON.stringify({idUser:idUser,task:task,state:"todo"})
        }).then(function(response){
  
            var data = response.data;
            var success = data.success;
            // we have already 3 attributes: idUser, task and state(todo)
            // with taskId we create task object locate in client's side 
            // so we can manipulated taskList in client's side
         
            if(success){
                var insertedTaskId = data.insertedTaskId;
                var insertedTask = {
                    _id: insertedTaskId,
                    idUser:idUser,
                    task: task,
                    state: "todo"
                };
                $scope.taskList.push(insertedTask);
                $scope.numberTask = $scope.taskList.length;
                StorageService.setTaskList($scope.taskList);
            }
        });
    }

    $scope.modifyTask = function(index){
       
        var task = $scope.taskList[index];
        var idUser = sessionStorage.getItem("idUser");
        var url = "https://localhost:443/modify";
        
        $http({
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: url,
            data: JSON.stringify({_id:task._id,state:task.state})
        }).then(function(response){
            var data = response.data;
            var success = data.success;
            if(success){
                if($scope.taskList[index].state == "todo"){
                    $scope.taskList[index].state = "done";
                }else{
                    $scope.taskList[index].state = "todo";
                }
            }
            StorageService.setTaskList($scope.taskList);
            console.log($scope.taskList);
        });
    }

    $scope.deleteTask = function(index){
        var task = $scope.taskList[index];
        var idUser = sessionStorage.getItem("idUser");
        var url = "https://localhost:443/delete";
        
        $http({
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: url,
            data: JSON.stringify({_id:task._id})
        }).then(function(response){
            var data = response.data;
            var success = data.success;
            if(success){
                $scope.taskList.splice(index,1);
                $scope.numberTask = $scope.taskList.length;
            }
            StorageService.setTaskList($scope.taskList);
        });
    }

   
    $scope.load();

}]);


