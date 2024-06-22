# CheckYard
## Predictive Maintainence of Industrial Equipment
### 🎯 Goal
The primary goal of this project is to develop a comprehensive predictive maintenance solution for industrial equipment, specifically focusing on turbofan engines, by leveraging machine learning techniques to predict remaining useful life (RUL) and classify engine health conditions. This solution aims to enhance equipment reliability, optimize maintenance schedules, and minimize downtime, thereby improving operational efficiency and reducing costs.

![Landing Page](https://github.com/SharitVaishnav/CheckYard/assets/149710322/71589cde-85a7-4abf-a4ed-385ecacfcc07)

### 🎯 Purpose
The purpose of this project is to provide a robust and user-friendly web application that enables users to proactively monitor and manage the health of industrial equipment.
- By allowing users to input real-time sensor data and receive predictive insights on engine conditions and remaining useful life, the application empowers maintenance teams to take timely and informed actions.
- This not only helps in early detection of potential failures but also facilitates proactive maintenance scheduling, leading to improved equipment performance, reduced unexpected downtime, and enhanced safety and compliance within industrial operations.

### 🧵 Dataset
Link : https://data.nasa.gov/dataset/C-MAPSS-Aircraft-Engine-Simulator-Data/xaut-bemq/about_data

### 🧾 Description
This project aims to develop a predictive maintenance solution for industrial equipment, specifically focusing on turbofan engines, using machine learning techniques. The web application allows users to register, input engine data, and receive predictive insights to manage and maintain equipment proactively.

**Website Features:**

1. User Registration and Engine Monitoring:
Users can register on the platform and monitor specific engines by inputting relevant data.

2. Data Input:
Engine data, including sensor values and the current time cycle, can be uploaded in the form of a CSV file. The system processes this data to generate predictions.

3. Predictive Models:
Regression Model: Predicts the remaining useful life (RUL) of the engine.
Classification Model: Determines the engine's health condition, classifying it as:
- Good Condition
- Moderate Condition
- Worst Condition

4. Dashboard:
The dashboard provides a comprehensive view of the engine's health metrics through various graphs and charts. It displays:
- Condition Metrics: Indicates the overall health status of the engine.
- Sensor Data Visualization: Graphs showing temperature, physical fan speed, and coolant levels.
- Maintenance Cost Estimation: Based on assumed values, the dashboard estimates the cost of maintenance to help users plan and budget accordingly.
By offering these features, the application aims to improve equipment reliability, optimize maintenance schedules, reduce unexpected downtime, and enhance operational safety and efficiency.

### 🚀 Models Implemented

1. Remaining Useful Life (RUL) Prediction: <br>
**Convolutional Neural Network (CNN) combined with Long Short-Term Memory (LSTM):**<br>
Why Chosen:<br>
- CNN: Convolutional layers are excellent at capturing spatial hierarchies in data. In the context of sensor data, CNNs can effectively learn patterns and features from sequences of data points, such as trends and anomalies.
- LSTM: Long Short-Term Memory networks are designed to handle time series data by capturing long-term dependencies and temporal patterns. They are particularly well-suited for predicting the remaining useful life of equipment, as they can remember and utilize information from previous time steps to make accurate predictions.

2. Engine Health Classification:<br>
**Extreme Gradient Boosting (XGBoost) Classifier:**<br>
Why Chosen:<br>
- Ensemble Method: XGBoost is an ensemble learning method that combines multiple weak learners (decision trees) to form a strong learner. This approach improves the model's robustness and accuracy.
- Handling Imbalanced Data: XGBoost is effective at handling imbalanced datasets, which is crucial for classification tasks where failure cases might be rare compared to normal operations.
- Efficiency and Speed: XGBoost is known for its high performance and fast computation speed, making it suitable for real-time classification tasks in predictive maintenance.
- Accuracy: XGBoost often provides superior predictive performance compared to other machine learning algorithms, making it a preferred choice for classification problems in complex datasets.

### 📈 Performance of the Models based on the Accuracy Scores

1. CNN-LSTM Model for RUL Prediction:
**Root Mean Squared Error (RMSE): 14.809**
- CNN-LSTM Model: The RMSE value of 14.809 indicates the average prediction error of the CNN-LSTM model for predicting the remaining useful life (RUL) of the engines. A lower RMSE suggests that the model's predictions are closer to the actual RUL values, indicating good performance in predicting the health status of the engines over time.

2. XGBoost Classifier for Engine Health Classification:
**Accuracy: 96.02%**
- XGBoost Classifier: The accuracy of 96.02% for the XGBoost classifier indicates the proportion of correct classifications (good, moderate, worst conditions) made by the model out of all predictions. A higher accuracy score reflects the model's ability to effectively classify engine health states based on sensor data, demonstrating strong performance in distinguishing between different operational conditions of the engines.

### 📢 Conclusion
This project successfully developed and implemented predictive maintenance solutions for industrial turbofan engines using advanced machine learning techniques.
- The CNN-LSTM model effectively predicts the remaining useful life (RUL) of turbofan engines with a reasonable RMSE, indicating its capability to forecast maintenance needs accurately based on historical sensor data.
- The XGBoost classifier demonstrates high accuracy in classifying engine health conditions into good, moderate, and worst states, enabling proactive maintenance decision-making.

The project achieves its goal of enhancing equipment reliability and operational efficiency through predictive maintenance, leveraging machine learning models that accurately predict failures and classify engine conditions, thereby reducing downtime and improving safety and cost-effectiveness in industrial operations.

## ✒️ Contributors <br>
**Team name : Schedule Stompers**
1) Abhijeet Kaithwas
2) Sharit Vaishnav   		
3) Udbhav Mittal
4) Rishikesh Dwivedi				
