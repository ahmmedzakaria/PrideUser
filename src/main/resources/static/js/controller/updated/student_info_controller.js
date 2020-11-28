'use strict';

app.factory('StudentInfo', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/studentinfolist/:userId', {userId: '@users.userId'},
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
app.factory('StudentSession', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateStudentSession: {method: 'PUT'}
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

app.controller('StudentInfoController', ['$scope', '$rootScope', 'StudentInfo', 'StudentRecordBs', 'CommonSupport',
    'StudentSession', 'Classes', 'Section', 'Groups',
    function ($scope, $rootScope, StudentInfo, StudentRecordBs, CommonSupport, StudentSession,
            Classes, Section, Groups) {

        var ob = this;
        localStorage.getItem("role") == 4;
        ob.clicked;
        ob.test;
        ob.studentinfolist = "studentinfolist";
        ob.maxroll = "maxroll";
        ob.role = "role";
        ob.errorMsg = 'Something Wrong ';
        ob.user = localStorage.getItem("user");
        ob.studentInfos = [];
        ob.studentInfo = new StudentInfo();
        ob.commonSupport = new CommonSupport();
        ob.studentInfo.users = {};
        ob.studentInfo.users.role = {};
        ob.studentInfo.users.role.roleId = localStorage.getItem("role");
        ob.studentRecordBs = new StudentRecordBs();
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

//        ob.fetchAllStudentInfos = function () {
//            ob.studentInfos = StudentInfo.query({path: ob.studentinfolist});
//            ob.commonSupport = CommonSupport.get({userId: 1}, function () {});
//        };


      //  ob.fetchAllStudentInfos();
//        if (localStorage.getItem("role") == 4) {
//            //ob.fetchAllStudentInfos();
//        } else {
//            // ob.fetchAllRoleInfos();
//        }
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
                //ob.generateAttendanceList(ob.studentRecordBsList);
                
            });
            ob.commonSupport = CommonSupport.get({userId: 1}, function () {});
        };
        ob.fetchAllStudentInfos();



        ob.addStudentInfo = function () {
            console.log('Inside save');
//            ob.studentInfo=ob.nullFilter(ob.studentInfo);
//            console.log('Student info');
            console.log(ob.studentInfo);
            if ($scope.studentInfoForm.$valid) {
                console.log(ob.studentInfo);
                // delete ob.studentInfo.studentInfoId;
                ob.studentInfo.$save({path: ob.studentinfolist}, function (studentInfo) {
                    console.log(studentInfo);
                    $rootScope.successAllert(ob.studentInfo.users.firstName + ' Saved Successfully');
                    ob.reset();
                    //ob.fetchAllStudentInfos();
                },
                        function (err) {
                            console.log(err.status);
                            $rootScope.errorAllert(ob.errorMsg + 'during Save');
                        }
                );
            }
        };

        ob.getMaxRoll = function () {
            var rollNumber = 0;
            console.log('Group Change');
            console.log('rollNo: ' + rollNumber);
            ob.rbs = new StudentRecordBs();
            ob.rbs = StudentRecordBs.get({basepath: 'studentinfo', subpath: ob.maxroll,
                sessionId: ob.studentRecordBs.studentSession.sessionId, classId: ob.studentRecordBs.classes.classId,
                sectionId: ob.studentRecordBs.section.sectionId, groupId: ob.studentRecordBs.groups.groupId}, function () {
                ob.studentRecordBs.rollNumber = ob.rbs.rollNumber;
                console.log('rollNo: ' + ob.rbs);
            });

        };
        ob.groupFlag = true;

        ob.showGroup = function () {
            if (ob.studentRecordBs.classes.classId == 9 || ob.studentRecordBs.classes.classId == 10) {
                ob.groupFlag = false;
            } else {
                ob.groupFlag = true;
//                ob.groups={"groupId":"1"};
//                ob.studentRecordBs.groups = ob.groups;
//                ob.getMaxRoll();

            }
        };
        ob.setGroupIfNeed=function(){
            
            if(ob.studentRecordBs.classes.classId<9){
                ob.groupFlag = true;
                ob.groups={"groupId":"1"};
                ob.studentRecordBs.groups = ob.groups;
                ob.getMaxRoll();
            }
        };

        ob.editStudentInfo = function (id) {
            console.log('Inside edit: ' + id);
            ob.studentInfo = StudentInfo.get({path: ob.studentinfolist, userId: id}, function () {
                for (var i = 0; i < ob.studentInfo.studentRecordBsList.length; i++) {
                    ob.studentRecordBs = ob.studentInfo.studentRecordBsList[0];
                    ob.studentInfo.studentRecordBsList = [ob.studentRecordBs];
//                    console.log("studentRecordBs:");
//                    console.log(ob.studentRecordBs);
//                    console.log("studentInfo:");
//                    console.log(ob.studentInfo);
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
//            console.log('studentRecordBs');
//            console.log(ob.studentRecordBs);
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
        ob.addAdmin = function () {
            console.log('addAdmin clicked');
            localStorage.setItem("user", "Admin");
            localStorage.setItem("role", "1");
        };

        ob.addTeacher = function () {
            console.log('addTeacher clicked');
            localStorage.setItem("user", "Teacher");
            localStorage.setItem("role", "2");
        };

        ob.addOfficeStuff = function () {
            console.log('addOfficeStuff clicked');
            localStorage.setItem("user", "Office Stuff");
            localStorage.setItem("role", "3");
        };

        ob.addStudent = function () {
            console.log('addTeacher clicked');
            localStorage.setItem("user", "Student");
            localStorage.setItem("role", "4");
        };
        ob.viewUsers = function () {
            ob.fetchAllRoleInfos();
        };
        ob.viewStudents = function () {
            ob.fetchAllStudentInfos();
        };
        $scope.uploadFile = function (event) {
            console.log('uploadfile');
            var files = event.target.files;
            console.log(files);
            if (files.length > 0) {
                console.log("Ok");
                $('#fileName').text(files[0].name);
                $('#fileSize').text(files[0].size);

                console.log($('#fileSelected').val());
                $('#filePath').text($('#fileSelected').val());
                ob.studentInfo.users.imagePath = $('#fileSelected').val();
                // console.log('mozilla');
                //console.log($('input[type=file]').files[0].mozFullPath);
                console.log(ob.studentInfo.users);
            }
        };
        ob.getFilePath = function () {
            console.log('change');
            $scope.count++;
//            $('#fileSelected').on('change', function (evt) {
//                var files = $(evt.currentTarget).get(0).files;
//                if (files.length > 0) {
//                    console.log("Ok");
//                    $('#fileName').text(files[0].name);
//                    $('#fileSize').text(files[0].size);
//                    $('#filePath').text($('#fileSelected').val());
//                }
//            });
        };
    }]);


