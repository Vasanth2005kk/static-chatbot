from flask import Flask, request, redirect, url_for, render_template,jsonify
import os
from werkzeug.utils import secure_filename
import json
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure upload folder and allowed file types
UPLOAD_FOLDER = './static/uploads'

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB

# Ensure upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if file is of allowed type."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def datas():
    with open("Data.json", "r") as file:
        data = json.load(file)
    return data

@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html',all_questions = datas())

@app.route('/login')
def login():
    return render_template('AdLogin.html')

@app.route('/admin', methods=['POST', 'GET'])
def admin():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        if username == 'admin' and password == 'admin':
            return render_template('admin.html', all_questions = datas())
    return render_template('AdLogin.html')

@app.route('/addData', methods=['POST'])
def addData():
    try:
        # Accessing form data
        question = request.form.get('question')
        answer = request.form.get('answer')
        image = request.files.get('image')

        # Validate form fields
        if not question or not answer:
            return "Question and Answer fields are required.", 400

        # Validate and save image
        file_path = ""
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            unique_filename = f"{os.urandom(8).hex()}_{filename}"
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            image.save(file_path)
            print(f"Image saved successfully at {file_path}.")

        # Log the data
        print(f"Question: {question}")
        print(f"Answer: {answer}")

        new_data = {
            "question": question,
            "answer": answer,
            "image": file_path.replace('./static/', '')  # Store relative path
        }

        # Load existing data from the JSON file
        json_file_path = 'Data.json'
        try:
            if os.path.exists(json_file_path):
                with open(json_file_path, 'r') as read_json:
                    existing_data = json.load(read_json)
            else:
                existing_data = []
        except json.JSONDecodeError:
            existing_data = []

        # Check for duplicates
        if any(entry["question"] == question and entry["answer"] == answer for entry in existing_data):
            return "Duplicate data. Entry already exists.", 400

        # Append new data
        existing_data.append(new_data)

        # Write back to the JSON file
        with open(json_file_path, 'w') as write_json:
            json.dump(existing_data, write_json, indent=4)

        return "Data received successfully!", 200
    except Exception as e:
        print(f"Error: {e}")
        return f"An error occurred: {e}", 500


@app.route("/Datajson")
def Datajson():
    with open("Data.json", "r") as file:
        data = json.load(file)

    # Update the image paths to be accessible via the Flask static route
    for item in data:
        if item.get("image"):
            item["image"] = url_for('static', filename=item["image"].replace('./', ''))

    return jsonify(data)

@app.route('/updateData', methods=['POST'])
def update_data():
    try:
        original_question = request.form.get('originalQuestion')
        updated_question = request.form.get('updatedQuestion')
        updated_answer = request.form.get('updatedAnswer')
        updated_image = request.files.get('updatedImage')

        if not original_question or not updated_question or not updated_answer:
            return "Missing required fields.", 400

        # Load existing data
        json_file_path = 'Data.json'
        with open(json_file_path, 'r') as file:
            data = json.load(file)

        # Find the original entry and update it
        for entry in data:
            if entry['question'] == original_question:
                entry['question'] = updated_question
                entry['answer'] = updated_answer

                # If a new image is provided, save it
                if updated_image and allowed_file(updated_image.filename):
                    filename = secure_filename(updated_image.filename)
                    unique_filename = f"{os.urandom(8).hex()}_{filename}"
                    file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
                    updated_image.save(file_path)
                    entry['image'] = file_path

                break
        else:
            return "Original question not found.", 404

        # Write back the updated data
        with open(json_file_path, 'w') as file:
            json.dump(data, file, indent=4)

        return jsonify({"message": "Data updated successfully."}), 200

    except Exception as e:
        print(f"Error: {e}")
        return f"An error occurred: {e}", 500



if __name__ == "__main__":
    app.run(debug=True, port=5000)
