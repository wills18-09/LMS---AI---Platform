from flask import Blueprint, request, jsonify
from models import db, Course, Enrollment
from flask_jwt_extended import jwt_required, get_jwt_identity

routes = Blueprint("routes", __name__)

@routes.route("/courses", methods=["POST"])
def create_course():
    data = request.json
    course = Course(title=data["title"], description=data["description"])
    db.session.add(course)
    db.session.commit()
    return jsonify({"message": "Course created"})

@routes.route("/courses", methods=["GET"])
def get_courses():
    courses = Course.query.all()
    return jsonify([
        {"id": c.id, "title": c.title, "description": c.description}
        for c in courses
    ])

@routes.route("/enroll/<int:course_id>", methods=["POST"])
@jwt_required()
def enroll(course_id):
    user_id = get_jwt_identity()
    enrollment = Enrollment(user_id=user_id, course_id=course_id)
    db.session.add(enrollment)
    db.session.commit()
    return jsonify({"message": "Enrolled successfully"})