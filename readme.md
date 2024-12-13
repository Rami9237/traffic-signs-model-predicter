# Project Name: Traffic Sign Recognition Model

## 🚦 Overview
Machine learning model for detecting traffic signs and lights with UI interface to preview predictions

## 🛠 Installation
### Prerequisites
- Python 3
- pip
- node
- npm

### Steps
1. Clone the repository
```bash
git clone https://github.com/Rami9237/traffic-signs-model-predicter.git
cd traffic-sign-model-predicter
```

2. Create virtual environment (optional)
```bash
python -m venv venv
source venv/bin/activate
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Open the jupyter notebook and update the global variables TRAIN_DIR, VALIDATION_DIR and TEST_DIR

5. Execute the cells to generate the model .keras file

6. Add the model to the backend folder

7. start the server 
```bash
cd backend
python main.py
```
8. start the frontend
```bash
cd frontend
npm run dev
```
## 🚀 Demo
Here's a quick demo of how the app looks like 😀
![Project Demo](/demomodel.gif)