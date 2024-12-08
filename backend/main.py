from flask import Flask, request, jsonify
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import io
from PIL import Image
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

model = load_model('E:/repos/traffic-signs-model-predicter/backend/traffic_signs_classifier.keras')
CLASSES = [
    'Green Light', 'Red Light', 
    'Speed Limit 10', 'Speed Limit 20', 'Speed Limit 30', 'Speed Limit 40', 
    'Speed Limit 50', 'Speed Limit 60', 'Speed Limit 70', 'Speed Limit 80', 
    'Speed Limit 90', 'Speed Limit 100', 'Speed Limit 110', 'Speed Limit 120', 
    'Stop'
]
IMAGE_SIZE = (224, 224)

def preprocess_image(image_file):
    """
    Preprocess the uploaded image for prediction
    """
    # Open the image file
    img = Image.open(io.BytesIO(image_file.read()))
    
    # Resize and convert to RGB (in case of transparent or grayscale images)
    img = img.resize(IMAGE_SIZE).convert('RGB')
    
    # Convert to numpy array and normalize
    img_array = img_to_array(img) / 255.0
    
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

@app.route('/api/predict-traffic-sign', methods=['POST'])
def predict_traffic_sign():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    image_file = request.files['image']
    
    try:
        # Preprocess the image
        processed_image = preprocess_image(image_file)
        
        # Make prediction
        prediction = model.predict(processed_image)
        
        # Get the class with highest probability
        predicted_class_idx = np.argmax(prediction)
        predicted_class = CLASSES[predicted_class_idx]
        confidence = float(prediction[0][predicted_class_idx])
        
        return jsonify({
            'class': predicted_class,
            'confidence': confidence
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)