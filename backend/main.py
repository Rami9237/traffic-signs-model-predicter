from flask import Flask, request, jsonify
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.models import load_model
import numpy as np
import io
from PIL import Image
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

model = load_model('E:/repos/traffic-signs-model-predicter/backend/traffic_signs.keras')
CLASSES = [
    'Green Light', 'Red Light', 'Speed Limit 10', 'Speed Limit 100', 'Speed Limit 110',
    'Speed Limit 120', 'Speed Limit 20', 'Speed Limit 30', 'Speed Limit 40',
    'Speed Limit 50', 'Speed Limit 60', 'Speed Limit 70', 'Speed Limit 80',
    'Speed Limit 90', 'Stop'
]
IMAGE_SIZE = (30, 30)

def classify_single_image(image_path, model, class_names, image_size):
    """Classifies a single image."""
    img = load_img(image_path, target_size=image_size)
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_class_idx = np.argmax(predictions)
    predicted_class = class_names[predicted_class_idx]

    confidence = float(predictions[0][predicted_class_idx])
    return predicted_class, confidence

@app.route('/api/predict-traffic-sign', methods=['POST'])
def predict_traffic_sign():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    image_file = request.files['image']

    try:
        temp_image_path = "temp_image.jpg"
        image_file.save(temp_image_path)

        predicted_class, confidence = classify_single_image(
            image_path=temp_image_path,
            model=model,
            class_names=CLASSES,
            image_size=IMAGE_SIZE
        )

        # Return the predicted class and confidence
        return jsonify({
            'class': predicted_class,
            'confidence': confidence
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        if os.path.exists(temp_image_path):
            os.remove(temp_image_path)

if __name__ == '__main__':
    app.run(debug=True)