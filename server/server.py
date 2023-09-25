from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)


@app.route('/locations')
def get_location_names():
    response = jsonify({
        'locations': util.get_locations()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict', methods=['POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bath = int(request.form['bath'])
    bhk = int(request.form['bhk'])

    response = jsonify({
        'EstimatedPrice': util.get_estimated_price(location, total_sqft, bath, bhk)
    })

    return response


if __name__ == "__main__":
    print('Starting python flask server for home price prediction')
    util.load_saved_artifacts()
    util.get_locations()
    app.run()
