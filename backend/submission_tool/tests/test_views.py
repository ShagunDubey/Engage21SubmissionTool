from rest_framework.test import APITestCase
from submission_tool.models import (
    User, Classroom, StudentProfile, TeacherProfile, Assignment, Submission)
from django.test import TestCase
from django.urls import reverse
import datetime


class UserViewTest(APITestCase):

    def test_register(self):

        response = self.client.post(
            '/dj-rest-auth/registration/',
            {
                'email': 'stu@email.com',
                'password1': 'test@1234',
                'username': 'testuser',
                'password2': 'test@1234',
                'department': 'CS'
            }
        )
        self.assertEqual(response.status_code, 201)

    def test_login(self):
        self.test_register()
        response = self.client.post('/dj-rest-auth/login/',
                                    {
                                        'email': 'stu@email.com',
                                        'password': 'test@1234'
                                    }
                                    )
        self.assertEqual(response.status_code, 200)

    def test_logout(self):
        self.test_login()
        response = self.client.post('/dj-rest-auth/logout/')
        self.assertEqual(response.status_code, 200)


class ClassroomTestAsTeacher(TestCase):

    def setUp(self):
        response = self.client.post(
            '/dj-rest-auth/registration/',
            {
                'email': 'test@test.com',
                'password1': 'test@1234',
                'username': 'testuser',
                'password2': 'test@1234',
                'department': 'CS',
                'is_teacher': 'true'
            }
        )
        self.assertEqual(response.status_code, 201)
        response = self.client.post('/dj-rest-auth/login/',
                                    {
                                        'email': 'test@test.com',
                                        'password': 'test@1234'
                                    }
                                    )
        self.teacher = User.objects.get(id=1)
        self.student1 = User.objects.create(
            username='test1', email='test1@test.com', password='test@1234')
        self.student2 = User.objects.create(
            username='test2', email='test2@test.com', password='test@1234')
        self.classroom1 = Classroom.objects.create(
            name='Test class',
            teacher=self.teacher
        )
        self.classroom1.students.add(self.student1, self.student2)
        self.classroom2 = Classroom.objects.create(
            name='Test class 2',
            teacher=self.teacher
        )
        self.classroom2.students.add(self.student1)
        self.classroom3 = Classroom.objects.create(
            name='Test class 3',
            teacher=self.teacher
        )
        self.classroom3.students.add(self.student2)
        self.classroom_url = reverse('classrooms')
        self.classroom_details_url = reverse('classroom_details', args=[1])

    def test_postValidData(self):
        response = self.client.post(self.classroom_url, data={'classroom': {
            'name': 'API',
        }
        }, content_type='application/json')
        self.assertEquals(response.status_code, 200)

    def test_postInvalidData(self):
        response = self.client.post(self.classroom_url, data={'classroom': {
        }
        }, content_type='application/json')
        self.assertDictEqual(response.data, {'message': 'Bad request'})
        self.assertEquals(response.status_code, 400)

    def test_getListMethod(self):

        response = self.client.get(self.classroom_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.data), Classroom.objects.count())

    def test_getDetailsValidMethod(self):
        response = self.client.get(self.classroom_details_url, id=1)
        self.assertEquals(response.status_code, 200)

    def test_getDetailsInvalidMethod(self):
        response = self.client.get('/api/classrooms/100')
        self.assertEquals(response.status_code, 400)
        self.assertDictEqual(response.data, {'message': 'Object not found'})

    def test_deleteClassroom_pass(self):
        response = self.client.delete(self.classroom_details_url)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(
            response.data, 'Classroom with id `1` has been deleted.')

    def test_deleteClassroom_fail(self):
        response = self.client.delete('/api/classrooms/100')
        self.assertEquals(response.status_code, 400)
        self.assertDictEqual(
            response.data, {'message': 'Classroom not found'})


class ClassroomTestAsStudent(TestCase):

    def setUp(self):
        response = self.client.post(
            '/dj-rest-auth/registration/',
            {
                'email': 'test@test.com',
                'password1': 'test@1234',
                'username': 'testuser',
                'password2': 'test@1234',
                'department': 'CS',
                'is_teacher': 'false'
            }
        )
        self.assertEqual(response.status_code, 201)
        response = self.client.post('/dj-rest-auth/login/',
                                    {
                                        'email': 'test@test.com',
                                        'password': 'test@1234'
                                    }
                                    )
        self.teacher = User.objects.create(
            username='test1', email='test1@test.com', password='test@1234')
        self.student1 = User.objects.get(pk=1)
        self.student2 = User.objects.create(
            username='test2', email='test2@test.com', password='test@1234')
        self.classroom1 = Classroom.objects.create(
            name='Test class',
            teacher=self.teacher
        )
        self.classroom1.students.add(self.student1, self.student2)
        self.classroom2 = Classroom.objects.create(
            name='Test class 2',
            teacher=self.teacher
        )
        self.classroom2.students.add(self.student1)
        self.classroom3 = Classroom.objects.create(
            name='Test class 3',
            teacher=self.teacher
        )
        self.classroom3.students.add(self.student2)
        self.classroom_url = reverse('classrooms')
        self.classroom_details_url = reverse('classroom_details', args=[1])

    def test_postValidData(self):
        response = self.client.post(
            self.classroom_url,
            data={'classroom':  'Test class 3'},
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 200)
        self.assertDictEqual(response.data, {'message': 'student added'})

    def test_postInvalidData(self):
        response = self.client.post(self.classroom_url,
                                    data={'classroom': ''},
                                    content_type='application/json')
        self.assertDictEqual(response.data, {'message': 'Not found'})
        self.assertEquals(response.status_code, 400)

    def test_getListMethod(self):

        response = self.client.get(self.classroom_url)
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.data), Classroom.objects.filter(
            students=self.student1).count())

    def test_classroomLeave(self):
        response = self.client.delete(self.classroom_details_url)
        self.assertEquals(response.status_code, 200)
        self.assertDictEqual(
            response.data,
            {
                'message':
                    'Student `testuser` has left the classroom `Test class`.'
            }
        )


class StudentProfileTest(TestCase):
    def setUp(self):
        response = self.client.post(
            '/dj-rest-auth/registration/',
            {
                'email': 'test@test.com',
                'password1': 'test@1234',
                'username': 'testuser',
                'password2': 'test@1234',
                'department': 'CS',
                'is_teacher': 'false'
            }
        )
        self.assertEqual(response.status_code, 201)
        response = self.client.post(
            '/dj-rest-auth/login/',
            {
                'email': 'test@test.com',
                'password': 'test@1234'
            }
        )
        self.url = reverse('profile', args=[1])

    def test_StudentProfileCreate(self):
        data = {'data': {
            'student': {
                'roll': 11223,
                'course': 'B Tech'
            }
        }}
        response = self.client.post(
            self.url,
            data=data,
            content_type='application/json'
        )
        self.assertDictContainsSubset(data['data']['student'], response.data)
        self.assertEquals(response.status_code, 200)

    def test_StudentProfileShow_pass(self):
        StudentProfile.objects.create(
            student=User.objects.get(pk=1),
            roll=1122,
            course='B Tech'
        )
        response = self.client.get(
            self.url,
            content_type='application/json'
        )
        self.assertDictContainsSubset({
            'roll': 1122,
            'course': 'B Tech'}, response.data)
        self.assertEquals(response.status_code, 200)

    def test_StudentProfileShow_fail(self):
        response = self.client.get(
            self.url,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 400)


class TeacherProfileTest(TestCase):
    def setUp(self):
        response = self.client.post(
            '/dj-rest-auth/registration/',
            {
                'email': 'test@test.com',
                'password1': 'test@1234',
                'username': 'testuser',
                'password2': 'test@1234',
                'department': 'CS',
                'is_teacher': 'true'
            }
        )
        self.assertEqual(response.status_code, 201)
        response = self.client.post(
            '/dj-rest-auth/login/',
            {
                'email': 'test@test.com',
                'password': 'test@1234'
            }
        )
        self.url = reverse('profile', args=[1])

    def test_TeacherProfileCreate(self):
        data = {'data': {
            'teacher': {
                'emp_id': 11223,
                'designation': 'Professor'
            }
        }}
        response = self.client.post(
            self.url,
            data=data,
            content_type='application/json'
        )
        self.assertDictContainsSubset(data['data']['teacher'], response.data)
        self.assertEquals(response.status_code, 200)

    def test_TeacherProfileShow_pass(self):
        TeacherProfile.objects.create(
            teacher=User.objects.get(pk=1),
            emp_id=1122,
            designation='Professor'
        )
        response = self.client.get(
            self.url,
            content_type='application/json'
        )
        self.assertDictContainsSubset({
            'emp_id': 1122,
            'designation': 'Professor'}, response.data)
        self.assertEquals(response.status_code, 200)

    def test_TeacherProfileShow_fail(self):
        response = self.client.get(
            self.url,
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 400)

    def test_idMismatchInGetRequest(self):
        response = self.client.get(
            '/api/profile/11',
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 403)

    def test_idMismatchInPostRequest(self):
        response = self.client.post(
            '/api/profile/11',
            content_type='application/json'
        )
        self.assertEquals(response.status_code, 403)


class AssignmentViewTestAsTeacher(ClassroomTestAsTeacher):
    def setUp(self):
        super().setUp()
        self.assignment_url = reverse('assignments', args=[1])
        self.assignment = Assignment.objects.create(
            title='Assignment 1',
            description='testing assignment 1',
            classroom=self.classroom1
        )
        self.assignment_details_url = reverse(
            'assignment_details', args=[1, 1])

    def test_AssignmentCreation_pass(self):
        data = {
            'assignment': {
                'title': 'Test assignment',
                'description': 'Testing',
                'classroom': 1
            }
        }
        response = self.client.post(
            self.assignment_url, data=data, content_type='application/json')
        self.assertDictContainsSubset({
            'title': 'Test assignment',
            'description': 'Testing',
            'classroom': 1}, response.data)
        self.assertEqual(response.status_code, 200)

    def test_AssignmentCreation_fail(self):
        data = {
            'assignment': {
                'title': 'Test assignment',
                'description': 'Testing',
                'classroom': 100
            }
        }
        response = self.client.post(
            self.assignment_url, data=data, content_type='application/json')
        self.assertDictEqual(response.data, {"message": "Bad request"})
        self.assertEqual(response.status_code, 400)

    def test_AssignmentList(self):
        response = self.client.get(
            self.assignment_url, content_type='application/json')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)

    def test_AssignmentDetailsShow(self):
        response = self.client.get(
            self.assignment_details_url, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_AssignmentDetailsUpdate(self):
        data = {'assignment': {'points': 20,
                               'description': 'change desc',
                               'd': datetime.datetime.now()
                               }
                }
        response = self.client.put(
            self.assignment_details_url,
            data=data,
            content_type='application/json'
        )
        self.assertEqual(data['assignment']['description'],
                         response.data['description'])
        self.assertEqual(response.status_code, 200)

    def test_AssignmentDelete(self):
        response = self.client.delete(self.assignment_details_url)
        self.assertEquals(response.status_code, 200)
        self.assertEqual(
            response.data, 'Assignment with id `1` has been deleted.')


class AssignmentViewTestAsStudent(ClassroomTestAsStudent):
    def setUp(self):
        super().setUp()
        self.assignment_url = reverse('assignments', args=[1])
        self.assignment = Assignment.objects.create(
            title='Assignment 1',
            description='testing assignment 1',
            classroom=self.classroom1
        )
        self.assignment_details_url = reverse(
            'assignment_details', args=[1, 1])

    def test_AssignmentCreation(self):
        data = {
            'assignment': {
                'title': 'Test assignment',
                'description': 'Testing',
                'classroom': 100
            }
        }
        response = self.client.post(
            self.assignment_url, data=data, content_type='application/json')
        self.assertDictEqual(response.data, {'message': "Unauthorized"})
        self.assertEqual(response.status_code, 403)

    def test_AssignmentDetailsUpdate(self):
        data = {'assignment': {'points': 20,
                               'description': 'change desc',
                               'd': datetime.datetime.now()
                               }
                }
        response = self.client.put(
            self.assignment_details_url,
            data=data,
            content_type='application/json'
        )
        self.assertDictEqual(response.data, {'message': "Unauthorized"})
        self.assertEqual(response.status_code, 403)

    def test_AssignmentDelete(self):
        response = self.client.delete(self.assignment_details_url)
        self.assertDictEqual(response.data, {'message': "Unauthorized"})
        self.assertEquals(response.status_code, 403)


class SubmissionViewAsTeacher(AssignmentViewTestAsTeacher):
    def setUp(self):
        super().setUp()
        self.submission = Submission.objects.create(
            answer_text='answer_text',
            student=self.student1,
            assignment=self.assignment
        )
        self.submission_url = reverse('submissions', args=[1])
        self.submission_details_url = reverse('submission_details', args=[1])

    def test_SubmissionList(self):
        response = self.client.get(
            self.submission_url, content_type='application/json')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)

    def test_SubmissionDetails_pass(self):
        response = self.client.get(
            self.submission_details_url, content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_SubmissionDetails_fail(self):
        response = self.client.get(
            '/api/submissions/100',
            content_type='application/json'
        )
        self.assertDictEqual(
            response.data, {'message': "Submission not found."})
        self.assertEquals(response.status_code, 400)

    def test_SubmissionUpdate_pass(self):
        data = {'submission': {'score': 10,
                               'comments': 'change comments',
                               }
                }
        response = self.client.put(
            self.submission_details_url,
            data=data,
            content_type='application/json'
        )
        self.assertEqual(data['submission']['score'],
                         response.data['marks'])
        self.assertEqual(data['submission']['comments'],
                         response.data['comments'])
        self.assertEqual(response.status_code, 200)

    def test_SubmissionUpdate_fail(self):
        data = {'submission': {'score': 10,
                               'comments': 'change comments',
                               }
                }
        response = self.client.put(
            '/api/submissions/100',
            data=data,
            content_type='application/json'
        )
        self.assertDictEqual(
            response.data, {'message': "Submission not found."})
        self.assertEquals(response.status_code, 400)


class SubmissionViewAsStudent(AssignmentViewTestAsStudent):
    def setUp(self):
        super().setUp()
        self.submission = Submission.objects.create(
            answer_text='answer_text',
            student=self.student1,
            assignment=self.assignment
        )
        self.submission_url = reverse('submissions', args=[1])
        self.submission_details_url = reverse('submission_details', args=[1])

    def test_SubmissionList(self):
        response = self.client.get(
            self.submission_url, content_type='application/json')
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.status_code, 200)

    def test_SubmissionUpdate_fail(self):
        data = {'submission': {'score': 10,
                               'comments': 'change comments',
                               }
                }
        response = self.client.put(
            '/api/submissions/1',
            data=data,
            content_type='application/json'
        )
        self.assertDictEqual(response.data, {'message': "Unauthorized"})
        self.assertEqual(response.status_code, 403)

    def test_createSubmission_pass(self):
        data = {
            'answer_text': 'Test submission',
            'student': 1,
            'assignment': 1
        }
        response = self.client.post(
            self.submission_url, data=data, content_type='application/json')
        self.assertDictContainsSubset({
            'answer_text': 'Test submission',
            'student': 1,
            'assignment': 1}, response.data)
        self.assertEqual(response.status_code, 200)

    def test_createSubmission_fail(self):
        data = {
            'answer_text': 'Test submission',
            'student': 1,
            'assignment': 1
        }
        response = self.client.post(
            '/api/assignments/100/submissions',
            data=data, content_type='application/json')
        self.assertDictEqual(response.data, {"message": "Bad request"})
        self.assertEqual(response.status_code, 400)
# readme - setup steps, testing - coverage flow,
# setup superuser, improvements, tradeoffs
# video
# bash script
