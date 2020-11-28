'use strict';

app.factory('StudentInfo', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/marksinfo/:path/:userId', {userId: '@users.userId'},
                {
                    updateStudentInfo: {method: 'PUT'}
                }
        );
    }]);

app.factory('StudentRecordBs', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/:basepath/:subpath/:sessionId/:classId/:sectionId/:groupId/:subjectId',
                {sessionId: '@sessionId', classId: '@sectionId', sectionId: '@classId', groupId: '@groupId', subjectId: '@subjectId'},
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

app.factory('Subjects', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateGroups: {method: 'PUT'}
                }
        );
    }]);

app.factory('Exams', ['$resource', function ($resource) {
        return $resource('http://localhost:8080/SchoolManagement/studentinfo/service/:userId', {userId: '@userId'},
                {
                    updateGroups: {method: 'PUT'}
                }
        );
    }]);

app.controller('ReportController', ['$scope', '$http', '$rootScope', 'StudentInfo', 'StudentRecordBs', 'CommonSupport',
    'StudentSession', 'Classes', 'Section', 'Groups', 'Attendance', 'Subjects', 'Exams',
    function ($scope, $http, $rootScope, StudentInfo, StudentRecordBs, CommonSupport, StudentSession,
            Classes, Section, Groups, Attendance, Subjects, Exams) {
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
        ob.groups = {"groupName": "Select Group", "groupId": "1"};
        ob.subjects = new Subjects();
        ob.subjects = {"subjectName": "Select Subject"};
        ob.exams = new Exams();
        ob.exams = {"examName": "Select Exam"};
        ob.markList = [];
        ob.path = "marks";
        ob.disablity = true;

        ob.getStudentsBySesssion = function () {
            console.log('session Change');
            console.log(ob.studentSession.sessionId);

            ob.classFlag = true;

        };

        ob.getStudentsBySesssionAndClass = function () {
            console.log('classes Change');
            console.log(ob.classes.classId);

            ob.sectionFlag = true;
            if (ob.classes.classId > 8 && ob.section.sectionId > 0) {
                ob.groupFlag = true;
            } else {
                ob.groupFlag = false;
            }

        };
        ob.getStudentsBySesssionClassAndSection = function () {
            console.log('Section Change');
            console.log(ob.section.sectionId);

            if (ob.classes.classId > 8) {
                ob.groupFlag = true;
                ob.disablity = true;
                ob.marksFlag = true;
            } else if (ob.classes.classId < 9) {
                ob.groups.groupId = 1;
                ob.disablity = false;
            } else {
                ob.groupFlag = false;
                ob.marksFlag = false;

            }

        };

        ob.getStudentsBySesssionClassSectionAndGroup = function () {
            console.log('groups Change');
            console.log(ob.groups.groupId);

            if (ob.groups.groupId > 1) {
                ob.disablity = false;
                ob.marksFlag = true;
            } else {
                ob.disablity = true;
                ob.marksFlag = false;
            }

        };

        ob.getSubjectiveResult = function () {
            console.log('Subject Result');
            console.log(ob.subjects.subjectId);
            //var url='/SchoolManagement/marksinfo/marksreport/'+ob.studentSession.sessionId+'/'+ob.classes.classId+'/'+ob.section.sectionId+'/1/'+ob.subjects.subjectId;

            //var url = '/SchoolManagement/report/marksreport/' + ob.studentSession.sessionId + '/' + ob.classes.classId + '/' + ob.section.sectionId + '/' + ob.groups.groupId + '/' + ob.subjects.subjectId;
            var url = '/SchoolManagement/report/marksreport/' + ob.studentSession.sessionId + '/' + ob.classes.classId + '/' + ob.section.sectionId + '/' + ob.groups.groupId + '/' + ob.subjects.subjectId + '/' + ob.exams.examId;;

            $http.get(url, {responseType: 'arraybuffer'})
                    .success(function (data) {
                        var file = new Blob([data], {type: 'application/pdf'});
                        var fileURL = URL.createObjectURL(file);
                        window.open(fileURL);
                    });
        };

        ob.attendanceReport = function () {
            console.log('attendanceReport');
            var url = '/SchoolManagement/report/attendance/' + ob.studentSession.sessionId + '/' + ob.classes.classId + '/' + ob.section.sectionId + '/' + ob.groups.groupId;

            $http.get(url, {responseType: 'arraybuffer'})
                    .success(function (data) {
                        var file = new Blob([data], {type: 'application/pdf'});
                        var fileURL = URL.createObjectURL(file);
                        window.open(fileURL);
                    });
        };
        
        ob.subjectSelected = function () {
            ob.examFlag = true;
        };

        ob.fetchAllStudentInfos = function () {

            ob.commonSupport = CommonSupport.get({userId: 1}, function () {});
        };
        ob.fetchAllStudentInfos();


    }]);


