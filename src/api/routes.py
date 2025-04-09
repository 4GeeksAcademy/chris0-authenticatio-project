"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def handle_signup():
    email=request.json.get("email", None)
    password=request.json.get("password", None)
    if User.query.filter_by(email=email).first():
        return jsonify({"msg" : "this email is already taken"}), 400
    
    
    new_user=User(email=email, password=password, is_active=True)


    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg" : "user created successfully"}), 201

@api.route('/login', methods=['POST'])    
def handle_login():
    email=request.json.get("email", None)
    password=request.json.get("password", None)

    if email is None or password is None:
        return jsonify({"msg" : "invalid email or password "}), 400
    user=User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({"msg" : "there is no such user "}), 404
    if user.password != password:  
        return jsonify({"message":"bad email/password"}),401 
   
    access_token=create_access_token(identity=user.email,)
    return jsonify({"token" : access_token}), 200



