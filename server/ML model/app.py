from flask import Flask, request, jsonify,send_file
import numpy as np
import tensorflow as tf
import joblib
import pandas as pd
import seaborn as sns
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

train = pd.read_csv('Classification_train_1.csv')

import numpy as np

def transform_input_data(input_data, seq_length=50, num_features=15):
    # Check if the input data length is correct
    if len(input_data) != 15:
        raise ValueError(f"Input data must be of length {num_features}")

    # Repeat the input data to match the required sequence length
    repeated_data = np.tile(input_data, (seq_length, 1))

    # Add a new axis to make the shape (1, seq_length, num_features)
    reshaped_data = np.expand_dims(repeated_data, axis=0)

    return reshaped_data



@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the request data
        data = request.get_json(force=True)
        features = np.array(data['features'])

        # Log the shape and content of the features
        print(f"Received features shape: {features.shape}")
        print(f"Received features content: {features}")

        features = features.reshape(1,-1)
        
        # Load your models
        pipe = joblib.load("pipe.pkl")

        # Make prediction
        pipe_pred = pipe.predict(features)
        
        print(f"Prediction: {pipe_pred}")

        # Return the prediction as JSON
        output = jsonify({
                            'pipe_pred' : pipe_pred.tolist(),
                          })
        return output
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/lifeModel', methods=['POST'])
def lifeModel():
    try:
        
        model = joblib.load("model.pkl")
        
        # Parse the request data
        data = request.get_json(force=True)
        features = np.array(data['features']).astype(np.float32)
        features = features[:,:]
        input_data = features.reshape(1, 30, 14)
        
        prediction = model.predict(input_data)
        
        print(f"Prediction: {prediction}")
        
        output = jsonify({
                            'predict' : prediction.tolist(),
                          })
        return output
        
        
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500    


train = pd.read_csv('Classification_train_1.csv')

@app.route('/plot')
def get_plot():
    id = int(request.args.get('id', 1))  # Default to 1 if not provided
    x = float(request.args.get('x', 0))
    y = float(request.args.get('y', 0))
    w = float(request.args.get('w', 0))
    z = float(request.args.get('z', 0))
    
    train_1 = train[train['ID'] == id]

    # Create a figure and axes
    fig, axes = plt.subplots(1, 3, figsize=(15, 5))

    # 1st graph
    sns.scatterplot(x=[x], y=[y], s=150, ax=axes[0], label='Input data')
    sns.lineplot(x='cycles', y='T24', data=train_1, color='green', ax=axes[0], label='Past performance')
    axes[0].set_title('Total temperature at LPC outlet vs Cycles')
    axes[0].set_xlabel('Cycles')
    axes[0].set_ylabel('Total temperature at LPC outlet (R)')
    axes[0].legend()


     # 2nd graph
    sns.scatterplot(x=[x], y=[z], s=150, ax=axes[1], label='Input data')
    sns.lineplot(x='cycles', y='T30', data=train_1, color='red', ax=axes[1], label='Past performance')
    axes[1].set_title('Total temperature at HPC outlet vs Cycles')
    axes[1].set_xlabel('Cycles')
    axes[1].set_ylabel('Total temperature at HPC outlet (R)')
    axes[1].legend()

    # 3rd graph
    sns.scatterplot(x=[x], y=[w], s=150, ax=axes[2], label='Input data')
    sns.lineplot(x='cycles', y='T50', data=train_1, color='orange', ax=axes[2], label='Past performance')
    axes[2].set_title('Total temperature at LPT outlet vs Cycles')
    axes[2].set_xlabel('Cycles')
    axes[2].set_ylabel('Total temperature at LPT outlet (R)')
    axes[2].legend()
    
    
    # Save the plot as an image file
    fig.savefig('plot.png')
    plt.close(fig)  # Close the figure to avoid memory issues

    return send_file('plot.png', mimetype='image/png')













if __name__ == '__main__':
    app.run(debug=True)
