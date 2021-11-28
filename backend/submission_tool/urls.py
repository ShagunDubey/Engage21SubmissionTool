from django.urls import path
from . import views

urlpatterns = [
    path('classrooms', views.ClassroomView.as_view(), name='classrooms'),
    path(
        'classrooms/<int:pk>',
        views.ClassroomDetailsView.as_view(),
        name='classroom_details'
    ),
    path('classrooms/<int:id>/assignments',
         views.AssignmentView.as_view(), name='assignments'),
    path('classrooms/<int:id>/assignments/<int:assignment_id>',
         views.AssignmentDetailsView.as_view(), name='assignment_details'),
    path('profile/<int:id>', views.UserProfileView.as_view(), name='profile'),
    path(
        'assignments/<int:assignment_id>/submissions',
        views.SubmissionView.as_view(), name='submissions'
    ),
    path('submissions/<int:id>', views.SubmissionDetailsView.as_view(),
         name='submission_details'),
    path('upload', views.upload),
    path('uploadProfilePic', views.uploadProfilePicture)
]
