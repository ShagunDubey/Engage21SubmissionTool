from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import (
    User,
    Classroom,
    Assignment,
    StudentProfile,
    TeacherProfile,
    Submission
)


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_teacher',
                  'department', 'first_name', 'last_name')


class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = StudentProfile
        fields = ('student', 'roll', 'course', 'image',)


class TeacherSerializer(serializers.ModelSerializer):

    class Meta:
        model = TeacherProfile
        fields = '__all__'


class CustomRegisterSerializer(RegisterSerializer):

    is_teacher = serializers.BooleanField()
    department = serializers.CharField(max_length=50, allow_blank=True)
    first_name = serializers.CharField(max_length=100, required=False)
    last_name = serializers.CharField(max_length=100, required=False)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        user.is_teacher = self.data.get('is_teacher')
        user.department = self.data.get('department')
        user.first_name = self.data.get('first_name')
        user.last_name = self.data.get('last_name')
        user.save()
        return user


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'is_teacher',
            'department',
            'first_name',
            'last_name'
        )


class AssignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Assignment
        fields = '__all__'


class ClassroomSerializer(serializers.ModelSerializer):

    students = UserSerializer(many=True, read_only=True)
    assignments = AssignmentSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = '__all__'


class ClassroomReadSerializer(serializers.ModelSerializer):

    students = UserSerializer(many=True, read_only=True)
    teacher = UserSerializer(many=False, read_only=True)
    assignments = AssignmentSerializer(many=True, read_only=True)

    class Meta:
        model = Classroom
        fields = '__all__'


class SubmissionReadSerializer(serializers.ModelSerializer):
    student = UserSerializer(read_only=True)
    assignment = AssignmentSerializer(read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'


class SubmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Submission
        fields = '__all__'
