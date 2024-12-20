import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime, timedelta

# Initialize Firebase
cred = credentials.Certificate("/Users/abhinavgurkar/Downloads/healthsync-d1ca4-firebase-adminsdk-hawa0-bf797d7cff.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

# Sample data for demonstration
sample_meal_schedule = {
    "user_id": "example_user_1",
    "morning_meal": "07:30",
    "afternoon_meal": "13:00",
    "evening_meal": "20:00"
}

sample_medication_schedule = [
    {"medicine": "Medicine A", "time_offset": -30, "meal": "morning_meal"},
    {"medicine": "Medicine B", "time_offset": 30, "meal": "afternoon_meal"},
    {"medicine": "Medicine C", "time_offset": -30, "meal": "evening_meal"}
]

# Save sample data to Firebase
db.collection("meal_schedules").document(sample_meal_schedule["user_id"]).set(sample_meal_schedule)
for med in sample_medication_schedule:
    db.collection("medications").add({
        "user_id": sample_meal_schedule["user_id"],
        "medicine": med["medicine"],
        "time_offset": med["time_offset"],
        "meal": med["meal"]
    })

# Function to calculate reminder times
def calculate_reminder(meal_time, offset_minutes):
    meal_time_obj = datetime.strptime(meal_time, "%H:%M")
    reminder_time = meal_time_obj + timedelta(minutes=offset_minutes)
    return reminder_time.strftime("%H:%M")

# Retrieve data from Firebase
def fetch_and_generate_reminders():
    users = db.collection("meal_schedules").stream()
    medications = db.collection("medications").stream()

    user_meal_times = {doc.id: doc.to_dict() for doc in users}
    med_list = [doc.to_dict() for doc in medications]

    reminders = []

    for med in med_list:
        user_id = med["user_id"]
        meal_time = user_meal_times[user_id][med["meal"]]
        reminder_time = calculate_reminder(meal_time, med["time_offset"])
        reminders.append({
            "user_id": user_id,
            "medicine": med["medicine"],
            "reminder_time": reminder_time
        })
        print(f"Reminder for {med['medicine']} for {user_id}: {reminder_time}")
    
    return reminders

# Generate and print reminders
fetch_and_generate_reminders()

