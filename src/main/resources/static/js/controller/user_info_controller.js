'use strict';

app.factory('StudentInfo', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/:path/:userId', {userId: '@users.userId'},
                {
                    updateStudentInfo: {method: 'PUT'}
                }
        );
    }]);

app.factory('StudentRecordBs', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/studentfilter/:sessionId/:classId',
        {sessionId: '@sessionId',classId:'@classId'},
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

app.controller('UserInfoController', ['$scope', '$rootScope', 'StudentInfo', 'StudentRecordBs', 'CommonSupport',
    'StudentSession','Classes', 'Section', 'Groups',
    function ($scope, $rootScope, StudentInfo, StudentRecordBs, CommonSupport, StudentSession,
    Classes, Section, Groups) {
 var ob = this;
 
        ob.clicked;
        ob.test;
        ob.studentinfolist = "studentinfolist";
        ob.role = "role";
        ob.errorMsg = 'Something Wrong ';
        ob.user = localStorage.getItem("user");
        ob.studentInfos = [];
        ob.studentInfo = new StudentInfo();
        ob.commonSupport = new CommonSupport();
        ob.studentInfo.users = {};
        ob.studentInfo.users.role = {};
        ob.studentInfo.users.role.roleId = localStorage.getItem("role");
        console.log("rollId: "+ob.studentInfo.users.role.roleId);
        ob.studentRecordBs = new StudentRecordBs();
        ob.studentInfo.studentRecordBsList = [ob.studentRecordBs];
        //ob.studentRecordBs=new studentRecordBs();
        ob.idForDelete;
        ob.studentSession=new StudentSession();
        ob.studentSession={"sessionName":"Select Session"};
        ob.classes=new Classes();
        ob.classes={"className":"Select Class"};
        ob.section=new Section();
        ob.section={"sectionName":"Select Section"};
        ob.groups=new Groups();
        ob.groups={"groupName":"Select Group"};

        ob.fetchCommonSupportInfos = function () {
            ob.studentInfos = StudentInfo.query({path: ob.studentinfolist});
        };
//        ob.fetchAllStudentInfos = function () {
//            ob.studentInfos = StudentInfo.query({path: ob.studentinfolist});
//            ob.commonSupport = CommonSupport.get({userId: 1}, function () {});
//        };
        ob.fetchAllRoleInfos = function () {
            ob.studentInfos = StudentInfo.query({path: ob.role});
            ob.commonSupport = CommonSupport.get({userId: 1}, function () {});
        };

       
            ob.fetchAllRoleInfos();
        ob.addStudentInfo = function () {
            console.log('Inside save');
//            ob.studentInfo=ob.nullFilter(ob.studentInfo);
//            console.log('Student info');
            console.log(ob.studentInfo);
            if ($scope.studentInfoForm.$valid) {
                console.log(ob.studentInfo);
                // delete ob.studentInfo.studentInfoId;
                ob.studentInfo.$save({path: ob.studentinfolist},function (studentInfo) {
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



        ob.nullFilter = (function filter(obj) {
            console.log("before filter");
            console.log(obj);
            $.each(obj, function (key, value) {
                if (value === "" || value === null) {
                    delete obj[key];
                } else if (Object.prototype.toString.call(value) === '[object Object]') {
                    filter(value);
                } else if ($.isArray(value)) {
                    $.each(value, function (k, v) {
                        filter(v);
                    });
                }
            });
            console.log("after filter");
            console.log(obj);
            return obj;
        });
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
                ob.studentRecordBs={'studentSession':ob.studentSession,
                    'classes':ob.classes,'section':ob.section,'groups':ob.groups
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
                ob.studentInfo.$updateStudentInfo({path: ob.studentinfolist},function (studentInfo) {
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

//        ob.addStudent = function () {
//            console.log('addTeacher clicked');
//            localStorage.setItem("user", "Student");
//            localStorage.setItem("role", "4");
//        };
        ob.viewUsers = function () {
            ob.fetchAllRoleInfos();
        };
//        ob.viewStudents = function () {
//            ob.fetchAllStudentInfos();
//        };
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


