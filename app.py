from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager

from config import Config
from models import db
from auth import auth
from routes import routes

# 1. CREATE APP FIRST
app = Flask(__name__)
app.config.from_object(Config)
#hello 

# 2. INIT EXTENSIONS
db.init_app(app)
jwt = JWTManager(app)
#heloooooo
# 3. REGISTER BLUEPRINTS (AFTER app exists)
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(routes)

# 4. CREATE TABLES
with app.app_context():
    db.create_all()

# 5. TEST ROUTE
@app.route("/")
def home():
    return "SQLite LMS Backend Running 🚀"

# 6. RUN SERVER
if __name__ == "__main__":
    app.run(debug=True)