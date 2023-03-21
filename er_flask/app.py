import os
import io
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify, request  # 서버 구현을 위한 Flask 객체 import
from flask_restx import Api, Resource  # Api 구현을 위한 Api 객체 import
import soundfile
import predict_torch_img as pti


app = Flask(__name__)  # Flask 객체 선언, 파라미터로 어플리케이션 패키지의 이름을 넣어줌.
api = Api(app)  # Flask 객체에 Api 객체 등록
CORS(app)

predictor = pti.getPredictor()

@api.route('/hello')  # 데코레이터 이용, '/hello' 경로에 클래스 등록
class HelloWorld(Resource):
    def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
        return {"hello": "world!"}

@api.route('/hello/<string:name>')  # url pattern으로 name 설정
class Hello(Resource):
    def get(self, name):  # 멤버 함수의 파라미터로 name 설정
        return {"message" : "Welcome, %s!" % name}

@api.route('/voicetest')
class VoiceTest(Resource):
    def post(self):
        print("voicetest 함수 호출")
        parsed_request = request.files.get('file')
        fileName = request.form.get('fileName')
        print(parsed_request.filename)
        print(fileName)
        
        dir_path = os.path.dirname(os.path.realpath(__file__))
        dir_path = dir_path + "\dataset"
        print(dir_path)
        saved_file_path = os.path.join(dir_path, fileName)
        print(saved_file_path)
        parsed_request.save(saved_file_path) 	# saved_file_path 경로에 받은 file 저장
        print("파일 저장 후")
        print(parsed_request.filename)
        # data, samplerate = soundfile.read(parsed_request)
        # print(data, samplerate)
        # with io.BytesIO() as fio:
        #     soundfile.write(
        #         fio, 
        #         data, 
        #         samplerate=samplerate, 
        #         subtype='PCM_16', 
        #         format='wav'
        #     )
        #     data = fio.getvalue()
        # print(data)
        # data.save("./dataset/" + fileName + ".wav")
        # result = test.get_emotion_from_voice(saved_file_path)
        result = predictor.predict(saved_file_path)
        
        file = "./predict.jpg"
        if os.path.isfile(file):
            os.remove(file)
        
        print("분석 끝")
        print(result)
        return {"result" : result}
    

if __name__ == "__main__":
    print("앱 실행 전")
    app.run(debug=True, host='0.0.0.0', port=5000)
    print("앱 실행 후")