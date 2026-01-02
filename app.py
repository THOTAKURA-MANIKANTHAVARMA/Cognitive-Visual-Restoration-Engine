from flask import Flask, render_template, request, redirect, url_for, session, flash
import os
from werkzeug.utils import secure_filename
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-in-production'
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(hours=2)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp'}

# Demo credentials (replace with database in production)
USERS = {
    'admin': 'admin123',
    'user': 'user123'
}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    if 'username' in session:
        return redirect(url_for('home'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if username in USERS and USERS[username] == password:
            session.permanent = True
            session['username'] = username
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Invalid username or password', 'error')
    
    return render_template('login.html')

@app.route('/home', methods=['GET', 'POST'])
def home():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    uploaded_image = None
    if request.method == 'POST':
        if 'image' not in request.files:
            flash('No file selected', 'error')
        else:
            file = request.files['image']
            if file.filename == '':
                flash('No file selected', 'error')
            elif file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                # Add timestamp to avoid conflicts
                import time
                filename = f"{int(time.time())}_{filename}"
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                uploaded_image = filename
                flash('Image uploaded successfully!', 'success')
            else:
                flash('Invalid file type. Please upload an image.', 'error')
    
    return render_template('home.html', uploaded_image=uploaded_image)

@app.route('/scope')
def scope():
    if 'username' not in session:
        return redirect(url_for('login'))
    return render_template('scope.html')

@app.route('/team')
def team():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    team_members = [
        {
            'name': 'Dr. Sarah Chen',
            'role': 'Project Lead & ML Engineer',
            'description': 'Leading the research and development of deep learning models for image colorization.',
            'expertise': 'GANs, Computer Vision, Neural Networks'
        },
        {
            'name': 'Alex Rodriguez',
            'role': 'Deep Learning Specialist',
            'description': 'Specializing in training and optimizing convolutional neural networks for chromatic enhancement.',
            'expertise': 'CNNs, PyTorch, Model Optimization'
        },
        {
            'name': 'Emily Watson',
            'role': 'Frontend Developer',
            'description': 'Creating intuitive and beautiful user interfaces for seamless interaction with the AI engine.',
            'expertise': 'HTML, CSS, JavaScript, React'
        },
        {
            'name': 'Michael Kim',
            'role': 'Backend Developer',
            'description': 'Building robust Flask APIs and managing data pipelines for model inference.',
            'expertise': 'Flask, Python, REST APIs, Database'
        },
        {
            'name': 'Priya Sharma',
            'role': 'UI/UX Designer',
            'description': 'Designing user-centered experiences and visual aesthetics for the application.',
            'expertise': 'Figma, Design Systems, User Research'
        }
    ]
    
    return render_template('team.html', team_members=team_members)

@app.route('/about')
def about():
    if 'username' not in session:
        return redirect(url_for('login'))
    
    project_info = {
        'title': 'Cognitive Visual Restoration Engine for Chromatic Enhancement of Monochrome Imagery',
        'description': 'An advanced deep learning system that intelligently restores color to black-and-white images using state-of-the-art neural networks.',
        'tech_stack': [
            'Flask 3.0.0 - Web Framework',
            'TensorFlow 2.15.0 - Deep Learning',
            'PyTorch 2.1.0 - Neural Networks',
            'OpenCV 4.8.1 - Image Processing',
            'NumPy 1.26.2 - Numerical Computing',
            'Pillow 10.1.0 - Image Manipulation',
            'Python 3.11 - Programming Language',
            'HTML5/CSS3/JavaScript - Frontend'
        ],
        'models': [
            'Generative Adversarial Networks (GANs) - For realistic color generation',
            'Convolutional Neural Networks (CNNs) - For feature extraction',
            'Autoencoders - For image reconstruction',
            'U-Net Architecture - For semantic segmentation',
            'ResNet - For deep residual learning'
        ],
        'objectives': [
            'Develop an AI-powered system for automatic image colorization',
            'Achieve high accuracy in color prediction and restoration',
            'Create a user-friendly web interface for easy interaction',
            'Optimize model performance for real-time processing',
            'Enable scalability for batch processing'
        ]
    }
    
    return render_template('about.html', project=project_info)

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('You have been logged out', 'info')
    return redirect(url_for('login'))

if __name__ == '__main__':
    # Create upload folder if it doesn't exist
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(debug=True, port=5000)
