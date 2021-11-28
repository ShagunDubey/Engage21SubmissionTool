from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    is_teacher = models.BooleanField(null=True, default=False)
    department = models.TextField(max_length=50, null=True, blank=True)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)


class StudentProfile(models.Model):
    student = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    roll = models.IntegerField(blank=True, null=True)
    course = models.CharField(max_length=50, blank=True, null=True)
    image = models.ImageField(
        upload_to='student_profiles',
        null=True, blank=True,
        default='/student_profiles/placeholder.png'
    )

    def __str__(self):
        return self.student.username + " 's profile created."


class TeacherProfile(models.Model):
    teacher = models.OneToOneField(
        User, on_delete=models.CASCADE, primary_key=True)
    emp_id = models.IntegerField(blank=True, null=True)
    image = models.ImageField(
        upload_to='teacher_profiles',
        blank=True, null=True,
        default='/teacher_profiles/placeholder.png'
    )
    designation = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.teacher.username + " 's profile created."


class Classroom(models.Model):
    name = models.CharField(max_length=50, unique=True, null=False)
    teacher = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='teacher')
    students = models.ManyToManyField(
        User,
        related_name='students',
        blank=True,
        limit_choices_to={'is_teacher': False}
    )

    def __str__(self):
        return self.name + " classroom created by " + self.teacher.username


class Assignment(models.Model):
    title = models.CharField(null=False, max_length=100)
    description = models.TextField(default='')
    classroom = models.ForeignKey(Classroom, on_delete=models.CASCADE,
                                  related_name='assignments')
    question = models.FileField(blank=True, null=True, upload_to='questions')
    deadline = models.DateTimeField(null=True)
    points = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['title', 'classroom']

    def __str__(self):
        return self.title + " "


class Submission(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    marks = models.IntegerField(null=True, blank=True)
    answer_text = models.TextField(null=True, blank=True)
    answer_file = models.FileField(
        upload_to='submissions', blank=True, null=True,)
    submitted_at = models.DateTimeField(auto_now_add=True)
    comments = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.student.username + " assignment:" + self.assignment.title
