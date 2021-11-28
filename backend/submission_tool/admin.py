from django.contrib import admin
from .models import (
  User,
  Classroom,
  Assignment,
  StudentProfile,
  TeacherProfile,
  Submission
  )

# Register your models here.
admin.site.register(User)
admin.site.register(Classroom)
admin.site.register(Assignment)
admin.site.register(StudentProfile)
admin.site.register(TeacherProfile)
admin.site.register(Submission)
