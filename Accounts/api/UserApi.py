# Python
import jwt
import datetime
from socket import gaierror
# Django
from django.contrib.auth import login, authenticate, logout
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
# Rest Framework
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
# Local
from ..models import User
from ..serializers.UserSerializer import UserSerializer, PublicUserSerializer
from .AuthenticationApi import TokenHandler
# This will have all rest api end points

# When sending usernames from the front end always make the lowercase
class UserApi(viewsets.ModelViewSet):
    
    serializer_class = UserSerializer
    queryset = User.objects.all()
    # Serializer Selector
    def get_serializer_class(self):
            if self.action == 'list':
                return PublicUserSerializer
            if self.action == 'create':
                return PublicUserSerializer
            if self.action == 'retrieve':
                return PublicUserSerializer
            return UserSerializer
    # Apart from Create (user not admin), Login, Forget Password can be accessed without authentication
    # All else needs to be authenticated

    # Create
    """
    username
    password
    password2
    email
    first_name
    last_name
    """
    def create(self, request):
        if request.data['password'] == request.data['password2']:
            user = User.objects.create(
                username=request.data['username'],
                first_name=request.data['first_name'],
                email=request.data["email"]
            )
            user.set_password(request.data["password"])
            user.save()
            # Here Create Any connected modals to user like Profile, Role Etc
            return Response(data=PublicUserSerializer(user).data, status=201)
        else:
            return Response(data={"message": "Passwords do not match"}, status=400)

    # Create Admin
    # Only Admins can create admins
    """
    username
    password
    password2
    email
    first_name
    last_name
    """    
    @action(detail=False, methods=['get'])
    def create_admin(self, request):
        user = request.user
        if user.is_superuser:
            response = create(request)
            user = User.objects.get(username= response.data['username'])
            user.is_superuser = True
            user.save()
        else:
            return Response(data={"message": "Does not have permission"}, status=401)

    # Retreive
    def retrieve(self, request, pk):
        # Define a public serializer to only show Username, Email, First_Name and Last Name and active state for now and us it instead of the base on
        # Admin can view any user
        # Others can only view themselfs
        user = request.user
        if user.is_superuser:
            # Admin
            return super().retrieve(request, pk)
        else:
            # Other
            user = User.objects.get(id= pk)
            if user == request.user:
                return super().retrieve(request, pk)
            else:
                return Response(data={"message": "Does not have permission"}, status=401)

    # Modify user details
    # Modify password
    # Update
    """
    username
    password1
    email
    first_name
    last_name
    """    
    def update(self, request, pk):
        # When updating user details a user should provide the password as well/ unless its admin
        # Only admins can edit other users data, Others can only edit their own
        password = request.data['password1']        
        # If the user is admin then check for the admin password
        user = User.objects.get(id= pk)
        if user == request.user:
            # User is updating himself
            user = authenticate(username=user.username, password=password)
            if user is not None:
                return super().update(request, pk)
            else:
                return Response(data={"message": "Invalid Credentials"}, status=401)
        else:
            # An Admin user is updating someone else
            user = request.user
            if user.is_superuser:
                user = authenticate(username=user.username, password=password)
                if user is not None:         
                    return super().update(request, pk)
                else:
                    return Response(data={"message": "Invalid Credentials"}, status=401)
            else:
                return Response(data={"message": "Does not have permission"}, status=401)

    # Modify user details
    # Modify password
    # Partial Update
    """
    username
    password1
    email
    first_name
    last_name
    """     
    def partial_update(self, request, pk):
        # When updating user details a user should provide the password as well/ unless its admin
        # Only admins can edit other users data, Others can only edit their own
        password = request.data['password1']        
        # If the user is admin then check for the admin password
        user = User.objects.get(id= pk)
        if user == request.user:
            # User is updating himself
            user = authenticate(username=user.username, password=password)
            if user is not None:
                return super().partial_update(request, pk)
            else:
                return Response(data={"message": "Invalid Credentials"}, status=401)
        else:
            # An Admin user is updating someone else
            user = request.user
            if user.is_superuser:
                user = authenticate(username=user.username, password=password)
                if user is not None:         
                    return super().partial_update(request, pk)
                else:
                    return Response(data={"message": "Invalid Credentials"}, status=401)
            else:
                return Response(data={"message": "Does not have permission"}, status=401)
        
    # Destory
    """
    password1
    """     
    def destroy(self, request, pk):
        # Only Admins can delete users/ They need to provide password before doing so
        password = request.data['password1']
        user = request.user
        if user.is_superuser:
            user = authenticate(username=user.username, password=password)
            if user is not None:
                return super().destroy(request, pk)
            else:
                return Response(data={"message": "Invalid Credentials"}, status=401)
        else:
            return Response(data={"message": "Does not have permission"}, status=401)            

    # List
    def list(self, request):
        # Only admins can view all users
        user = request.user
        if user.is_superuser:
            return super().list(request, pk)
        else:
            return Response(data={"message": "Does not have permission"}, status=401)

    # Get Current User
    @action(detail=False, methods=['get'])
    def get_current_user(self, request):
        serializer = PublicUserSerializer(request.user)
        return Response(data= serializer.data, status=200)
    
    # Login
    """
    username
    password
    """  
    @action(detail=False, methods=['post'])
    def login(self, request):
        serializer_class = PublicUserSerializer
        # return Response(data={"message": "Login"}, status=200)

        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response(data={"message": "User Logged In Successfully", "user": PublicUserSerializer(user).data}, status=200)
        else:
            return Response(data={"message": "Invalid Username or Password"}, status=400)

    # Logout    
    @action(detail=False, methods=['get'])
    def logout(self, request):
        logout(request)
        return Response(data={"message": "User Logged Out"}, status=200)

    # Change Password
    """
    username
    password
    password2
    """  
    @action(detail=False, methods=['post'])
    def change_password(self, request):
        # Add the new password
        if request.data['password'] == request.data['password2']:
            username = request.data['username']
            password = request.data['password']
            user = User.objects.get(username=username)
            user.set_password(password)
            user.save()
            return Response(data={"message": "Password Changed Successfully"}, status=201)
        else:
            return Response(data={"message": "Passwords Do Not Match"}, status=400)

    # Send E-Mail Verification Link
    """
    username
    email
    """
    @action(detail=False, methods=['get'])
    def send_activate_link(self, request):
        try:
            username = request.data['username']
            email = request.data['email']
            # Create the activation link here with the jwt token and add it to the link
            token = jwt.encode({'name': username, 'exp': datetime.datetime.now()}, settings.JWT_SECRET_KEY, algorithm='HS256').decode() 
            link = FRONTEND_URL + "/api/user/reset_password/" + username + "/" + token
            html_content = render_to_string("activationEmail.html", {'link': link, 'username': username})
            text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                # Subject
                "Account Activation Link",
                # Content
                text_content,
                # From
                settings.EMAIL_HOST_USER,
                # Receipients
                [email]
            )

            email.attach_alternative(html_content, "text/html")
            email.send()
            return Response(data={"message": "Email Sent"}, status=200)
        except gaierror as e:
            # Socker Errors
            if e.errno == 11001:
                # Connection Error
                return Response(data={"message": "Email was not Sent, Please check your internet connection or contact our support"}, status=400)
        except:
             # Something else
            return Response(data={"message": "Something went wrong please contact support"}, status=400)

    # Activate
    @action(detail=False, methods=['get'])
    def activate(self, request, username=None, token=None):
        # Decode the JWT and validate it, If valid set the user to active
        # JWT Token
        try:
            row_token = bytes(token, 'utf-8')
            decoded_token = jwt.decode(row_token, key, algorithms='HS256')
            if (datetime.datetime.now() - datetime.datetime.utcfromtimestamp(0)).total_seconds() - decode_token["exp"] <= 300:
                user = User.objects.get(username=username)
                user.is_active = True
                user.save()
                return Response(data={"message": "Account Activated"}, status=200)
            else:
                return Response(data={"message": "Token Expiered, Please request a new token"}, status=400)                
        except:
            return Response(data={"message": "Something went wrong please contact support"}, status=400)


    """
    username
    email
    """
    # ForgetPassword
    @action(detail=False, methods=['get'])
    def password_req(self, request):
        # Send an e mail with a link to prompt a password change
        try:
            username = request.data['username']
            email = request.data['email']
            # Create the activation link here with the jwt token and add it to the link
            token = jwt.encode({'name': username, 'exp': datetime.datetime.now()}, settings.JWT_SECRET_KEY, algorithm='HS256').decode() 
            link = FRONTEND_URL + "/api/user/reset_password/" + username + "/" + token
            html_content = render_to_string("passwordResetEmail.html", {'link': link, 'username': username})
            text_content = strip_tags(html_content)

            email = EmailMultiAlternatives(
                # Subject
                "Password Reset Link",
                # Content
                text_content,
                # From
                settings.EMAIL_HOST_USER,
                # Receipients
                [email]
            )

            email.attach_alternative(html_content, "text/html")
            email.send()
            return Response(data={"message": "Email Sent"}, status=200)
        except gaierror as e:
            # Socker Errors
            if e.errno == 11001:
                # Connection Error
                return Response(data={"message": "Email was not Sent, Please check your internet connection or contact our support"}, status=400)
        except:
             # Something else
            return Response(data={"message": "Something went wrong please contact support"}, status=400)

    """
    password1
    password2
    """    
    # Change Password Mail
    @action(detail=False, methods=['post'])
    def change_password_mail(self, request, username=None, token=None):
        # Decode the JWT and validate it
        # Change Password by mail
        # JWT Token
        try:
            row_token = bytes(token, 'utf-8')
            decoded_token = jwt.decode(row_token, key, algorithms='HS256')
            if (datetime.datetime.now() - datetime.datetime.utcfromtimestamp(0)).total_seconds() - decode_token["exp"] <= 300:
                if(request.data['password1'] == request.data['password2']):
                    user = User.objects.get(username=username)
                    user.set_password(request.data['password1'])
                    user.save()
                    return Response(data={"message": "Password Changed"}, status=201)
                else:
                    return Response(data={"message": "Passwords do not match"}, status=400)
            else:
                return Response(data={"message": "Token Expiered, Please request a new token"}, status=400)
        except:
            return Response(data={"message": "Something went wrong please contact support"}, status=400)

    # Login/ Authentication with JWT
    @ensure_csrf_cookie
    @action(detail=False, methods=['get'])
    def login_jwt(self, request):
        username = request.data['username']
        password = request.data['password']
        response = Response()
        if username is None or password is None:
            return Response(data={"message": "Username and Password required"}, status=400)
        
        user = User.objects.get(username=username)
        if user is None:
            return Response(data={"message": "User Not Found"}, status=400)
        if not user.check_password(password):
            return Response(data={"message": "Wrong Password"}, status=400)

        # Genarate Access and Refresh Tokens
        access_token = TokenHandler.gen_access_token(user)
        refresh_token = TokenHandler.gen_refresh_token(user)

        response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
        response.data = {
            'access_token': access_token,
            'user': UserSerializer(user).data
        }

    # Get new tokens from refresh tokens
    @action(detail=False, methods=['get'])
    def new_token(self, request):

        refreshtoken = request.COOKIES.get('refreshtoken')

        if refreshtoken is None:
            return Response(data={"message": "Authentication credentials not provided"}, status=400)
    
        try:
            payload =jwt.decode(refreshtoken, settings.JWT_RE_AUTH_SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return Response(data={"message": "Token Expired Please Login Again"}, status=400)
        
        user = User.objects.get(username=payload.get('username'))

        if user is None:
            return Response(data={"message": "User not found"}, status=400)
        
        # Genarate Access and Refresh Tokens
        access_token = TokenHandler.gen_access_token(user)
        refresh_token = TokenHandler.gen_refresh_token(user)

        response.set_cookie(key='refreshtoken', value=refresh_token, httponly=True)
        response.data = {
            'access_token': access_token,
            'user': UserSerializer(user).data
        }