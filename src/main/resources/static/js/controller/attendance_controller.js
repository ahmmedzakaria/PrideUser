'use strict';

app.factory('StudentInfo', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/attendanceinfo/:path/:userId', {userId: '@users.userId'},
                {
                    updateStudentInfo: {method: 'PUT'}
                }
        );
    }]);

app.factory('StudentRecordBs', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/:basepath/:subpath/:sessionId/:classId/:sectionId/:groupId',
                {sessionId: '@sessionId', classId: '@sectionId', sectionId: '@classId', groupId: '@groupId'},
                {
                    updateStudentrecordbs: {method: 'PUT'}
                }
        );
    }]);

app.factory('Attendance', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/attendanceinfo/:path/:sessionId',
                {sessionId: '@sessionId'},
                {
                    updateStudentrecordbs: {method: 'PUT'}
                }
        );
    }]);

app.factory('CommonSupport', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateCommonSupport: {method: 'PUT'}
                }
        );
    }]);

app.factory('StudentSession', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateStudentSession: {method: 'PUT'}
                }
        );
    }]);

app.factory('Classes', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateClasses: {method: 'PUT'}
                }
        );
    }]);
app.factory('Section', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateSection: {method: 'PUT'}
                }
        );
    }]);

app.factory('Groups', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateGroups: {method: 'PUT'}
                }
        );
    }]);

app.controller('AttendanceController', ['$scope', '$rootScope', 'StudentInfo', 'StudentRecordBs', 'CommonSupport',
    'StudentSession', 'Classes', 'Section', 'Groups', 'Attendance',
    function ($scope, $rootScope, StudentInfo, StudentRecordBs, CommonSupport, StudentSession,
            Classes, Section, Groups, Attendance) {
        var ob = this;

        ob.clicked;
        ob.test;
        ob.studentinfolist = "studentinfolist";
        ob.studentinfo = "studentinfo";
        ob.attendanceinfo = "attendanceinfo";

        //subPaht
        ob.studentfilter = "studentfilter";

        ob.role = "role";
        ob.errorMsg = 'Something Wrong ';
        ob.user = localStorage.getItem("user");
        ob.studentInfos = [];
        ob.studentInfo = new StudentInfo();
        ob.commonSupport = new CommonSupport();
        ob.attendance = new Attendance();
        ob.studentInfo.users = {};
        ob.studentInfo.users.role = {};
        ob.studentInfo.users.role.roleId = localStorage.getItem("role");
        ob.studentRecordBs = new StudentRecordBs();
        ob.studentRecordBsList = [];
        ob.studentInfo.studentRecordBsList = [ob.studentRecordBs];
        //ob.studentRecordBs=new studentRecordBs();
        ob.idForDelete;
        ob.studentSession = new StudentSession();
        ob.studentSession = {"sessionName": "Select Session"};
        ob.classes = new Classes();
        ob.classes = {"className": "Select Class"};
        ob.section = new Section();
        ob.section = {"sectionName": "Select Section"};
        ob.groups = new Groups();
        ob.groups = {"groupName": "Select Group"};
        ob.attendanceList = [];
        ob.path = "attendance";
        ob.disablity=true;
        
        ob.getStudentsBySesssion = function () {
            console.log('session Change');
            console.log(ob.studentSession.sessionId);
           
            ob.studentInfo = StudentRecordBs.get({basepath: ob.studentinfo, subpath: ob.studentfilter, sessionId: ob.studentSession.sessionId}, function () {
                ob.studentRecordBsList = ob.studentInfo.studentRecordBsList;
                ob.generateAttendanceList(ob.studentRecordBsList);
                console.log(ob.studentRecordBsList);
                ob.classFlag=true;
            });
        };

        ob.getStudentsBySesssionAndClass = function () {
            console.log('classes Change');
            console.log(ob.classes.classId);
            ob.studentInfo = StudentRecordBs.get({basepath: ob.studentinfo, subpath: ob.studentfilter, sessionId: ob.studentSession.sessionId, classId: ob.classes.classId}, function () {
                ob.studentRecordBsList = ob.studentInfo.studentRecordBsList;
                ob.generateAttendanceList(ob.studentRecordBsList);
                console.log(ob.studentRecordBsList);
                ob.sectionFlag=true;
                if(ob.classes.classId>8 && ob.section.sectionId>0){
                    ob.groupFlag=true;
                }else{
                    ob.groupFlag=false;
                }
            });
        };
        ob.getStudentsBySesssionClassAndSection = function () {
            console.log('Section Change');
            console.log(ob.section.sectionId);
            ob.studentInfo = StudentRecordBs.get({basepath: ob.studentinfo, subpath: ob.studentfilter, sessionId: ob.studentSession.sessionId, classId: ob.classes.classId,
                sectionId: ob.section.sectionId}, function () {
                ob.studentRecordBsList = ob.studentInfo.studentRecordBsList;
                ob.generateAttendanceList(ob.studentRecordBsList);
                console.log(ob.studentRecordBsList);
                if(ob.classes.classId>8){
                    ob.groupFlag=true;
                    ob.disablity=true;
                }else if(ob.classes.classId<9){ob.disablity=false;}
                else{
                    ob.groupFlag=false;
                    
                }
                
            });
        };

        ob.getStudentsBySesssionClassSectionAndGroup = function () {
            console.log('groups Change');
            console.log(ob.groups.groupId);
            ob.studentInfo = StudentRecordBs.get({basepath: ob.studentinfo, subpath: ob.studentfilter, sessionId: ob.studentSession.sessionId, classId: ob.classes.classId,
                sectionId: ob.section.sectionId, groupId: ob.groups.groupId}, function () {
                ob.studentRecordBsList = ob.studentInfo.studentRecordBsList;
                ob.generateAttendanceList(ob.studentRecordBsList);
                if(ob.groups.groupId>1){
                    ob.disablity=false;
                }else{
                    ob.disablity=true;
                }
                console.log(ob.studentRecordBsList);
            });
        };

        ob.fetchAllStudentInfos = function () {
            ob.studentInfo = StudentRecordBs.get({basepath: ob.studentinfo, subpath: ob.studentfilter, sessionId: 1}, function () {
                ob.studentRecordBsList = ob.studentInfo.studentRecordBsList;
                ob.generateAttendanceList(ob.studentRecordBsList);
                
            });
            ob.commonSupport = CommonSupport.get({userId: 1}, function () {});
        };
        ob.fetchAllStudentInfos();

        ob.generateAttendanceList = function (studentRecordBsList) {
            console.log(ob.studentRecordBsList);
            ob.attendanceList=[];
            for (var i = 0; i < studentRecordBsList.length; i++) {
                var attendance = {};
                attendance.attendanceStatus=true;
                attendance.studentRecordBs = studentRecordBsList[i];
                ob.attendanceList.push(attendance);

            }
            console.log(ob.attendanceList);

        };
        ob.addAttendance = function () {
            console.log('Inside save');
            for (var i = 0; i < ob.attendanceList.length; i++) {
                
                if(ob.attendanceList[i].attendanceStatus===true){
                    ob.attendanceList[i].attendanceStatus=1;
                }else{
                    ob.attendanceList[i].attendanceStatus=0;
                }
            }
            ob.studentInfo=new StudentInfo();
            ob.studentInfo.attendancesList =ob.attendanceList;
            console.log(ob.studentInfo);
            if ($scope.studentInfoForm.$valid) {
                ob.studentInfo.$save({path: ob.path}, function (studentInfo) {
                    $rootScope.successAllert(' Saved Successfully');
                    ob.reset();
                },
                        function (err) {
                            console.log(err.status);
                            $rootScope.errorAllert(ob.errorMsg + 'during Save');
                        }
                );
            }
        };
        
        
//        console.log("rbsId: "+rbsid);
        ob.getAttendanceForStudent=function(){
            var rbsid=localStorage.getItem("rbsId");
            ob.studentInfo=new StudentInfo();
            ob.studentInfo = StudentInfo.get({path: 'attendance', userId: rbsid}, function () {
                console.log(ob.studentInfo);
                ob.attendanceList=ob.studentInfo.attendancesList;
                for(var i=0; i<ob.studentInfo.studentRecordBsList.length;i++){
                    ob.studentRecordBs=studentRecordBsList[i];
                }
                console.log(ob.attendanceList);
                localStorage.setItem("rbsId", '');
            });
        };
        var rbsId=localStorage.getItem("rbsId");
        if(rbsId>0){
            console.log("rbsId: "+rbsId);
           ob.getAttendanceForStudent();
        }
        ob.viewAttendance= function(attendance){
              var rbsId=attendance.studentRecordBs.recordBsId;
              console.log("rbsId: "+rbsId);
              localStorage.setItem("rbsId", rbsId);
        };
        ob.editStudentInfo = function (id) {
            console.log('Inside edit: ' + id);
            ob.studentInfo = StudentInfo.get({path: ob.studentinfolist, userId: id}, function () {
                for (var i = 0; i < ob.studentInfo.studentRecordBsList.length; i++) {
                    ob.studentRecordBs = ob.studentInfo.studentRecordBsList[0];
                    ob.studentInfo.studentRecordBsList = [ob.studentRecordBs];
                }

                ob.studentSession = ob.studentRecordBs.studentSession;
                ob.classes = ob.studentRecordBs.classes;
                ob.section = ob.studentRecordBs.section;
                ob.groups = ob.studentRecordBs.groups;
                ob.studentRecordBs = {'studentSession': ob.studentSession,
                    'classes': ob.classes, 'section': ob.section, 'groups': ob.groups
                };
                ob.studentInfo.studentRecordBsList = [ob.studentRecordBs];
                ob.flag = 'edit';
            });
        };
        ob.updateStudentInfoDetail = function () {
            console.log('Inside update');
            ob.studentInfo.studentRecordBsList = [ob.studentRecordBs];
            delete ob.studentInfo.studentInfoId;
            console.log('studentInfo');
            console.log(ob.studentInfo);
            if ($scope.studentInfoForm.$valid) {
                ob.studentInfo.$updateStudentInfo({path: ob.studentinfolist}, function (studentInfo) {
                    $rootScope.successAllert(ob.studentInfo.users.firstName + ' Updated Successfully');
                    console.log("studentInfo:");
                    console.log(studentInfo);
                    ob.updatedId = studentInfo.users.userId;
                    ob.reset();

                    ob.fetchAllStudentInfos();
                });
            }
        };
        ob.prepareDelete = function (studentInfo) {
            ob.studentInfo = studentInfo;
            console.log('Inside prepareDelete' + ob.studentInfo.users.userId);
        };
        ob.deleteStudentInfo = function (id) {
            console.log('Inside delete' + ob.studentInfo.users.userId);
            ob.studentInfo = StudentInfo.delete({path: ob.studentinfolist, userId: ob.studentInfo.users.userId}, function () {
                ob.reset();
                $rootScope.successAllert(ob.studentInfo.users.firstName + ' Deleted Successfully');
                ob.fetchAllStudentInfos();
            });
        };
        
        
        ob.reset = function () {
            ob.studentInfo = new StudentInfo();
            $scope.studentInfoForm.$setPristine();
        };
        ob.cancelUpdate = function (id) {
            ob.studentInfo = new StudentInfo();
            ob.flag = '';
            ob.fetchAllStudentInfos();
        };


        ob.addStudent = function () {
            console.log('addTeacher clicked');
            localStorage.setItem("user", "Student");
            localStorage.setItem("role", "4");
        };

        ob.viewStudents = function () {
            ob.fetchAllStudentInfos();
        };

        $scope.attendanceStatus = function (status) {
            if (status == true) {
                return "Present";
            } else {
                return "Absent";
            }

        };
    }]);


