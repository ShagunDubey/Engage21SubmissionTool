from django.test import TestCase
from submission_tool.models import (
    StudentProfile,
    TeacherProfile,
    User,
    Classroom,
    Assignment,
    Submission
)
import datetime


class UserTest(TestCase):
    @classmethod
    def setUpTestData(
        cls,
        username='testuser',
        email='test@test.com',
        password='test@1234',
    ):
        department = ''
        User.objects.create(
            username=username,
            email=email,
            password=password,
            department=department,
        )

    def test_user_creation(self):
        user = User.objects.get(id=1)
        self.assertTrue(isinstance(user, User))

    def test_department_max_length(self):
        user = User.objects.get(id=1)
        max_length = user._meta.get_field('department').max_length
        self.assertEqual(max_length, 50)


class StudentProfileTest(TestCase):
    def create_student_profile(self, roll=1234, course='PhD'):
        student = User(
            username='test_user1',
            email='test1@email.com',
            password='test1@1234')
        student.save()
        return StudentProfile.objects.create(
            student=student,
            roll=roll,
            course='PhD'
        )

    def test_student_profile_creation(self):
        student = self.create_student_profile()
        self.assertTrue(isinstance(student, StudentProfile))
        self.assertEqual(
            str(student), student.student.username + " 's profile created."
        )


class TeacherProfileTest(TestCase):

    def create_teacher_profile(self, emp_id=1234, designation='Professor'):
        teacher = User(
            username='test_user1',
            email='test1@email.com',
            password='test1@1234',
            is_teacher=True
        )
        teacher.save()
        return TeacherProfile.objects.create(
            teacher=teacher,
            emp_id=emp_id,
            designation=designation,
        )

    def test_teacher_profile_creation(self):
        teacher = self.create_teacher_profile()
        self.assertTrue(isinstance(teacher, TeacherProfile))
        self.assertEqual(
            str(teacher), teacher.teacher.username + " 's profile created."
        )


class ClassroomTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        teacher = User.objects.create(
            username='test', email='test@test.com', password='test@1234')
        student1 = User.objects.create(
            username='test1', email='test1@test.com', password='test@1234')
        student2 = User.objects.create(
            username='test2', email='test2@test.com', password='test@1234')
        classroom = Classroom.objects.create(
            name='Test class',
            teacher=teacher
        )
        classroom.students.add(student1, student2)

    def test_classroom_creation(self):
        classroom = Classroom.objects.get(id=1)
        self.assertTrue(isinstance(classroom, Classroom))
        self.assertEqual(
            str(classroom), classroom.name +
            " classroom created by " + classroom.teacher.username
        )


class AssignmentTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        teacher = User.objects.create(
            username='test', email='test@test.com', password='test@1234')
        student1 = User.objects.create(
            username='test1', email='test1@test.com', password='test@1234')
        student2 = User.objects.create(
            username='test2', email='test2@test.com', password='test@1234')
        classroom = Classroom.objects.create(
            name='Test class',
            teacher=teacher
        )
        classroom.students.add(student1, student2)
        Assignment.objects.create(
            title='Test assignment',
            classroom=classroom,
            deadline=datetime.datetime.now(),
            points=100
        )

    def test_assignment_creation(self):
        assignment = Assignment.objects.get(id=1)
        self.assertTrue(isinstance(assignment, Assignment))
        self.assertEqual(
            str(assignment), assignment.title + " "
        )


class SubmissionTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        teacher = User.objects.create(
            username='test', email='test@test.com', password='test@1234')
        student1 = User.objects.create(
            username='test1', email='test1@test.com', password='test@1234')
        student2 = User.objects.create(
            username='test2', email='test2@test.com', password='test@1234')
        classroom = Classroom.objects.create(
            name='Test class',
            teacher=teacher
        )
        classroom.students.add(student1, student2)
        assignment = Assignment.objects.create(
            title='Test assignment',
            classroom=classroom,
            deadline=datetime.datetime.now(),
            points=100
        )
        Submission.objects.create(
            student=student1,
            assignment=assignment
        )

    def test_submission_creation(self):
        submission = Submission.objects.get(id=1)
        self.assertTrue(isinstance(submission, Submission))
        self.assertEqual(
            str(submission), submission.student.username +
            " assignment:" + submission.assignment.title
        )
