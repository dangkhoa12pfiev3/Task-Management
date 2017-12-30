// load operation is share among different controllers 
// so put it in service

routingApp.factory('StorageService',function($http){
    
        var storageService = {};
        storageService.setTaskList = function(taskList){
            storageService.taskList = taskList;
        };

        storageService.getTaskList = function(){
            return storageService.taskList;
        };

        storageService.load = function(callback){
            var idUser = sessionStorage.getItem("idUser");
            var url = "https://localhost:443/";
    
            $http({
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                url: url,
                data: JSON.stringify({idUser:idUser})
            }).then(function(response){
                var data = response.data;
                var taskList = data.data;

                callback(taskList);
            });
        };

        return storageService;
    });