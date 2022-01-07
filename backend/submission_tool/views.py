from .models import (
    Classroom,
    Assignment,
    StudentProfile,
    TeacherProfile,
    Submission
)
from .serializers import (
    ClassroomSerializer,
    AssignmentSerializer,
    StudentSerializer,
    TeacherSerializer,
    SubmissionSerializer,
    SubmissionReadSerializer,
    ClassroomReadSerializer
)
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist


@api_view(['POST'])
def upload(request):  # pragma: no cover
    data = request.data
    classroom = data['classroom']
    title = data['title'].replace('-', ' ')
    assignment = Assignment.objects.get(classroom=classroom, title=title)
    assignment.question = request.FILES.get('image')
    assignment.save()
    return Response({'message': 'File uploaded successfully!'}, status=200)


@api_view(['POST'])
def uploadProfilePicture(request):  # pragma: no cover
    data = request.data
    id = data['id']
    if request.user.is_teacher:
        obj = TeacherProfile.objects.get(pk=id)
    else:
        obj = StudentProfile.objects.get(pk=id)
    obj.image = request.FILES.get('image')
    obj.save()
    return Response(
        {'message': 'Profile picture changed successfully!'},
        status=200)


class ClassroomView(LoginRequiredMixin, APIView):
    login_url = '/dj-rest-auth/login'

    def get(self, request):
        if request.user.is_teacher:
            classes = Classroom.objects.filter(
                teacher=request.user.id).prefetch_related('assignments').all()

        else:
            classes = Classroom.objects.filter(students=request.user.id)
        serializer = ClassroomReadSerializer(classes, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.is_teacher:
            classroom = request.data.get('classroom')
            classroom['teacher'] = request.user.id
            serializer = ClassroomSerializer(data=classroom, many=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response({"message": "Bad request"}, status=400)
        else:
            class_name = request.data.get('classroom')
            try:
                classroom = Classroom.objects.get(name=class_name)
                classroom.students.add(request.user.id)
                return Response({"message": "student added"}, status=200)
            except ObjectDoesNotExist:
                return Response({"message": "Not found"}, status=400)


class ClassroomDetailsView(LoginRequiredMixin, APIView):
    login_url = '/dj-rest-auth/login'

    def get(self, request, pk):
        try:
            classes = Classroom.objects.get(pk=pk)
            serializer = ClassroomReadSerializer(classes)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response({"message": "Object not found"}, status=400)

    def delete(self, request, pk):
        try:
            classroom = Classroom.objects.get(pk=pk)
        except ObjectDoesNotExist:
            return Response({"message": "Classroom not found"}, status=400)

        if request.user.id:
            if request.user.is_teacher:
                classroom.delete()
                return Response(
                    data="Classroom with id `{}` has been deleted."
                    .format(pk),
                    status=200)
            elif request.user.id:
                classroom.students.remove(request.user)
                return Response(
                    {
                        "message": "Student `{}` has left the classroom `{}`."
                        .format(request.user.username, classroom.name)},
                    status=200)
        return Response({"message": "Please login first"}, status=403)


class AssignmentView(LoginRequiredMixin, APIView):
    login_url = '/dj-rest-auth/login'

    def get(self, request, id):
        assignments = Assignment.objects.filter(
            classroom=id
        ).order_by('-created_at')
        serializer = AssignmentSerializer(assignments, many=True)

        return Response(serializer.data)

    def post(self, request, id):
        if request.user.is_teacher:
            assignment = request.data.get('assignment')
            serializer = AssignmentSerializer(data=assignment)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            else:
                return Response({"message": "Bad request"}, status=400)
        return Response({'message': "Unauthorized"}, status=403)


class AssignmentDetailsView(LoginRequiredMixin, APIView):
    login_url = '/dj-rest-auth/login'

    def get(self, request, id, assignment_id):
        assignment = Assignment.objects.get(pk=assignment_id)
        serializer = AssignmentSerializer(assignment, many=False)
        return Response(serializer.data)

    def put(self, request, id, assignment_id):
        if request.user.is_teacher:
            updated_assignment = request.data.get('assignment')
            assignment = Assignment.objects.get(pk=assignment_id)

            if(updated_assignment['description'] != ''):
                assignment.description = updated_assignment['description']
            if(updated_assignment['d'] != ''):
                assignment.deadline = updated_assignment['d']
            assignment.points = updated_assignment['points']
            assignment.save()
            serializer = AssignmentSerializer(assignment, many=False)
            return Response(serializer.data, status=200)
        return Response({"message": "Unauthorized"}, status=403)

    def delete(self, request, id, assignment_id):
        assignment = Assignment.objects.get(pk=assignment_id)

        if request.user.is_teacher:
            assignment.delete()
            return Response(
                data="Assignment with id `{}` has been deleted."
                .format(assignment_id), status=200
            )
        else:
            return Response({"message": "Unauthorized"}, status=403)


class UserProfileView(LoginRequiredMixin, APIView):
    login_url = '/dj-rest-auth/login'

    def get(self, request, id):
        if request.user.id == id:
            try:
                if request.user.is_teacher:
                    teacher = TeacherProfile.objects.get(pk=id)
                    serializer = TeacherSerializer(teacher, many=False)
                else:
                    student = StudentProfile.objects.get(pk=id)
                    serializer = StudentSerializer(student, many=False)
                return Response(serializer.data, status=200)
            except ObjectDoesNotExist:
                return Response(
                    {'message': 'Profile not created yet.'},
                    status=400)
        return Response(data="Oops,something went wrong!Please log in.",
                        status=403)

    def post(self, request, id):

        if request.user.id == id:
            data = request.data.get('data')

            if request.user.is_teacher:
                teacher = data['teacher']
                teacher['teacher'] = request.user.id
                serializer = TeacherSerializer(data=teacher, many=False)
            else:
                student = data['student']
                student['student'] = request.user.id
                serializer = StudentSerializer(data=student, many=False)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=200)
        return Response(data={"message": "Please log in first."}, status=403)


class SubmissionView(LoginRequiredMixin, APIView):

    login_url = '/dj-rest-auth/login'

    def get(self, request, assignment_id):
        if request.user.id:
            if request.user.is_teacher:
                submissions = Submission.objects.filter(
                    assignment=assignment_id).order_by('-submitted_at')
            else:
                submissions = Submission.objects.filter(
                    assignment=assignment_id,
                    student=request.user.id
                ).order_by('-submitted_at')
            serializer = SubmissionReadSerializer(submissions, many=True)
            return Response(serializer.data, status=200)
        return Response({'message': 'Bad request'}, status=400)

    def post(self, request, assignment_id):
        data = request.data
        submission = {}
        submission['answer_text'] = data['answer_text']
        submission['student'] = request.user.id
        submission['assignment'] = assignment_id
        submission['answer_file'] = request.FILES.get('answer_file')
        serializer = SubmissionSerializer(data=submission, many=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        else:
            return Response({"message": "Bad request"}, status=400)
        return Response({'message': 'An error occurred'}, status=400)


class SubmissionDetailsView(LoginRequiredMixin, APIView):
    login_url = '/dj-rest-auth/login'

    def get(self, request, id):
        try:
            submissions = Submission.objects.get(pk=id)
            serializer = SubmissionReadSerializer(submissions, many=False)
            return Response(serializer.data, status=200)
        except ObjectDoesNotExist:
            return Response(
                {'message': "Submission not found."},
                status=400)

    def put(self, request, id):
        if request.user.is_teacher:
            data = request.data.get('submission')
            try:
                submission = Submission.objects.get(pk=id)
            except ObjectDoesNotExist:
                return Response(
                    {'message': "Submission not found."},
                    status=400)
            submission.marks = data['score']
            submission.comments = data['comments']
            submission.save()
            serializer = SubmissionSerializer(submission, many=False)
            return Response(serializer.data, status=200)
        else:
            return Response({"message": "Unauthorized"}, status=403)

    def delete(self, request, id):
        submission = Submission.objects.get(pk=id)

        if request.user.is_teacher or submission.student.id == request.user.id:
            submission.delete()
            return Response(
                data="Submission with id `{}` has been deleted."
                .format(id), status=200
            )
        else:
            return Response({"message": "Unauthorized"}, status=403)
