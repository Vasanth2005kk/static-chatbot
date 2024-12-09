from flask import Flask,render_template,jsonify,json,redirect,request
import DB

app = Flask(__name__)

@app.route("/")
@app.route("/home")
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('AdLogin.html')

@app.route('/admin',methods=['POST','GET'])
def admin():
    if request.method == "POST":
        username = request.form.get('username')
        password = request.form.get('password')
        if username == 'admin' and password == 'admin':
            return render_template('admin.html')
    return render_template('AdLogin.html')

@app.route('/addDetaile')
def add():
    return render_template('addQuestions.html')


if __name__ == "__main__":
    app.run(debug=True,port=5000)
