# **Flight Price Notifier**

---

## **Architecture**
![image](https://github.com/user-attachments/assets/fb9d786f-41da-4a24-8391-c5eb248ab7df)

---

## **Data Structures**

### **Price Data**
```json
{
    "flightId": "12345",
    "origin": "JFK",
    "destination": "LAX",
    "price": 200,
    "currency": "USD",
    "timestamp": "2024-12-08T10:00:00Z"
}
```
### **User Preferences**
```json
{
    "userPreferenceId": "80", 
    "userId": "67890",
    "preferredDestinations": ["LAX", "SFO"],
    "maxPrice": 300,
    "currency": "USD",
    "pushToken": "abcdef12345"
}
```
### **Notifications**
```json
{
    "notificationId": "112233",
    "userId": "67890",
    "flightId": "12345",
    "message": "Great deal: $200 for JFK to LAX!",
    "status": "sent",
    "timestamp": "2024-12-08T11:00:00Z"
}
