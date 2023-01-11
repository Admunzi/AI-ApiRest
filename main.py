from flask import Flask, request, render_template
import pickle
import pandas as pd

app = Flask(__name__)


@app.route('/')
def main():
    return render_template("index.html")


@app.route('/predict', methods=['POST'])
def predict_post():
    model_knn = load_model()

    # We get the json from the body in the request
    json_to_predict = request.get_json()
    return predict_wine(json_to_predict, model_knn)


def load_model():
    # Read model file
    file = open('./models/knn.pickle', 'rb')
    model_knn = pickle.load(file)
    file.close()
    return model_knn


def predict_wine(values_to_predict, model_knn):
    df = pd.DataFrame.from_dict(values_to_predict)
    result = model_knn.predict(df)
    return result.tolist()


app.run()
