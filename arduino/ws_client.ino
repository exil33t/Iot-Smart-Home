#include <Ethernet.h>



#include <WebSocketClient.h>

using namespace std;


char path[] = "/";
char host[] = "echo.websocket.org";
  
WebSocketClient webSocketClient;

// Use WiFiClient class to create TCP connections
EthernetClient client;

const int ledCount = 3;
const int ledPins[] = {3,4,5};

const int tempPin = 11;
const int brightnessPin = 9;
int reportDelayMs = 3000;

const int HIH4030_Pin = A0; //analog pin 0
const int deviceId = 1;

unsigned long lastReportInterval = 0;

void initLedPins(){
  for(int i=0; i<3;i++){
    pinMode(ledPins[i], OUTPUT); 
  }
}


void setup() {
  Serial.begin(9200);
  delay(10);
    initLedPins();

  // We start by connecting to a WiFi network

  Serial.print("Attempting connection...");

  
  uint8_t mac[] = { 0xde, 0xad, 0xbe, 0xef, 0xf0, 0x0d };  
  Ethernet.begin(mac);
  
  // This is how you get the local IP as an IPAddress object
  Serial.println(Ethernet.localIP());

  delay(5000);
  

  // Connect to the websocket server
  if (client.connect("echo.websocket.org", 80)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
    while(1) {
      // Hang on failure
    }
  }

  // Handshake with the server
  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
    while(1) {
      // Hang on failure
    }  
  }

}



void loop() {
  String data;

  if (client.connected()) {
    
    webSocketClient.getData(data);
    if (data.length() > 0) {
      Serial.print("Received data: ");
      handleRequest(data)
    }
    
    // capture the value of analog 1, send it along
//    pinMode(1, INPUT);
//    data = String(analogRead(1));
    
    if((millis() - lastReportInterval) > reportDelayMs){
      reportState();
    }
    
  } else {
    Serial.println("Client disconnected.");
    while (1) {
      // Hang on disconnect.
    }
  }
  
  // wait to fully let the client disconnect
  delay(3000);
  
}

void handleRequest(String data){
  // TODO
}

void reportState(){
  //TODO
//  webSocketClient.sendData("{'action':'reportState', 'temperature':" + std::to_string(getTemperature)) + ", 'humidity':" + std::to_string(getHumidity()) + ", 'brightness': " + std::to_string(getBrightness()) + ", 'deviceId':" + deviceId + "}";
}

float getTemperature(){
  int val = analogRead(tempPin);
  return (val/1024.0)*5000 / 10;
}

int getBrightness(){
  return analogRead(brightnessPin);
}

float getHumidity(){

  float supplyVolt = 5.0;
  
  int HIH4030_Value = analogRead(HIH4030_Pin);
  float voltage = HIH4030_Value/1023. * supplyVolt;
  
  float sensorRH = 161.0 * voltage / supplyVolt - 25.8;
  float trueRH = sensorRH / (1.0546 - 0.0026 * getTemperature()); //temperature adjustment
  
  return trueRH;
}
