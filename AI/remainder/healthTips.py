# Sample user health data
sample_health_data = [
    {"user_id": "example_user_1", "age": 30, "bmi": 24, "condition": "hypertension", "activity_level": "low"},
    {"user_id": "example_user_2", "age": 45, "bmi": 28, "condition": "diabetes", "activity_level": "moderate"},
    {"user_id": "example_user_3", "age": 25, "bmi": 22, "condition": "healthy", "activity_level": "high"}
]

# Sample tips (target variable)
sample_tips = [
    "Reduce sodium intake and engage in light exercise.",
    "Monitor blood sugar regularly and maintain a balanced diet.",
    "Continue regular exercise and ensure adequate hydration."
]

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("/Users/abhinavgurkar/Downloads/healthsync-d1ca4-firebase-adminsdk-hawa0-bf797d7cff.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

from sklearn.feature_extraction import DictVectorizer
from sklearn.tree import DecisionTreeClassifier
import joblib

# Prepare data
vectorizer = DictVectorizer(sparse=False)
X = vectorizer.fit_transform([data for data in sample_health_data])
y = sample_tips

# Train model
model = DecisionTreeClassifier()
model.fit(X, y)

# Save the model
joblib.dump(model, "health_tips_model.pkl")
joblib.dump(vectorizer, "vectorizer.pkl")


# Load the model
model = joblib.load("health_tips_model.pkl")
vectorizer = joblib.load("vectorizer.pkl")

# Example input for a new user
new_user = {"user_id": "example_user_6", "age": 32, "bmi": 27, "condition": "Thyroid", "activity_level": "low"}
new_user_vector = vectorizer.transform([new_user])

# Predict health tip
predicted_tip = model.predict(new_user_vector)
print(f"Suggested Health Tip: {predicted_tip[0]}")

# Save to Firebase
db.collection("health_tips").add({
    "user_id": new_user["user_id"],
    "health_tip": predicted_tip[0]
})