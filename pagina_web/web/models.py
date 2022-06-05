from django.db import models

# Create your models here.
class Formulario(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return '%s %s' % (self.email, self.password)