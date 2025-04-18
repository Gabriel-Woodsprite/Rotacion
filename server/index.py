from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import os
import mimetypes

from GraphicGenerator import GraphicGenerator

class Handler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
        
    def do_GET(self):
        if self.path == '/':
            self.path = '/index.html'  # default file

        # Set base path to project root (one level up from /server/)
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        filepath = os.path.join(project_root, self.path.lstrip('/'))

        try:
            mime_type, _ = mimetypes.guess_type(filepath)
            if mime_type is None:
                mime_type = 'application/octet-stream'

            with open(filepath, 'rb') as f:
                self.send_response(200)
                self.send_header('Content-type', mime_type)
                self.end_headers()
                self.wfile.write(f.read())

        except FileNotFoundError:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b'404 - Not Found')


    def returnResponse(self, result):
        response = None
        if "error" in result:
            response = {"error": result["error"]}
        else:
            # json result response
            response = {
                "Respuesta": result
            }

        return response

    def handleGraphs(self, graph1, graph2):
        graphicGenerator = GraphicGenerator()
        graphicGenerator.graphicate(graph1, graph2)

    def getTupleArray(self, coordinateArray):
        tupleArray = []
        for coordinate in coordinateArray:
            tupleArray.append(tuple(coordinate))
        return tupleArray

    def do_POST(self):
        # método para recibir informacion
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        # HANDLING INFO
        graphPoints1 = data.get("originalPoints");
        graphPoints2 = data.get("rotatedPoints");
        print(f'grafica 1: {graphPoints1}, grafica 2:{graphPoints2}')
        if graphPoints1 != None and graphPoints2 != None:
            pointTuple1 = self.getTupleArray(graphPoints1)
            pointTuple2 = self.getTupleArray(graphPoints2)
            self.handleGraphs(pointTuple1, pointTuple2)
            response = self.returnResponse("figure.png")
        # HANDLING INFO


        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())

if __name__ == "__main__":
    server = HTTPServer(("localhost", 8080), Handler)
    print("servidor corriendo en http://localhost:8080")
    server.serve_forever()