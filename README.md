System Metrics / Logs
        |
        v
+----------------------+
| Data Collection      |
+----------+-----------+
           |
           v
+----------------------+
| Backend API          |
| Node.js + Express    |
+----------+-----------+
           |
           +------------------+
           |                  |
           v                  v
+----------------+    +----------------+
| MongoDB        |    | ML Prediction  |
| Metrics        |    | Service        |
| Incidents      |    |                |
+----------------+    +-------+--------+
                              |
                              v
                    Incident Risk Score
                              |
                              v
+---------------------------------------------+
| React Support Dashboard                     |
|                                             |
| System Health | Metrics | Predictions       |
| Incidents     | Explanations | Statistics   |
+---------------------------------------------+
                              |
                              v
                    Support Engineer Action