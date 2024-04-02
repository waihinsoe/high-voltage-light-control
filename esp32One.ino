

#define LIGHT_SENSOR_PIN 34  // ESP32's pin GPIO13 connected to DO pin of the ldr module
#define LED_PIN 13
#define MOTION_SENSOR_PIN 19 
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "NCC_InstituteOfScience";
const char* password = "CrazySci3ntist";

// MQTT Broker
const char* mqtt_broker = "192.168.1.123"; // The IP address of your Mosquitto broker
const int mqtt_port = 1883;
int pinStateCurrent   = LOW;  // current state of pin
int pinStatePrevious  = LOW;  // previous state of pin

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {

  Serial.begin(115200);

    pinMode(LED_PIN, OUTPUT); // declare the ledPin as an OUTPUT
    digitalWrite(LED_PIN,LOW);
    // pinMode(MOTION_SENSOR_PIN, INPUT);
    setup_wifi();

  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  //   pinStatePrevious = pinStateCurrent; 
  //   pinStateCurrent  = digitalRead(MOTION_SENSOR_PIN);

  //   int lightValue = analogRead(LIGHT_SENSOR_PIN);
  //   int brightness = map(lightValue, 0, 4095, 0, 255);

  // if (pinStatePrevious == LOW && pinStateCurrent == HIGH) {
  //     Serial.println(brightness);
  //     analogWrite(LED_PIN, brightness);
  //   Serial.println("Motion detected!");
  //   client.publish("esp32One/motion/detect", "YES");
  //   client.publish("esp32One/led/brightness",String(brightness).c_str());
  // } else if(pinStatePrevious == HIGH && pinStateCurrent == LOW) {

  //   analogWrite(LED_PIN, 0); // Turn off the LED if no motion is detected
  //   Serial.println("No motion detected.");
  //   client.publish("esp32One/motion/detect", "NO");
  //   client.publish("esp32One/led/brightness", String(0).c_str());
  // }

  // delay(10);
}

void setup_wifi() {
  delay(10);
  // Connect to Wi-Fi
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  String message;
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  Serial.println(message);
  String topicStr = String(topic);

  if(topicStr == "test/topic") {
    if (message == "ON") {
        digitalWrite(LED_PIN, HIGH); // Turn the LED on
        Serial.println("LED turned ON");
      } else if (message == "OFF") {
        digitalWrite(LED_PIN, LOW); // Turn the LED off
        Serial.println("LED turned OFF");
      }
  }

  
  Serial.println();
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish("esp32One", "hello from esp32One");
      // ... and resubscribe
      client.subscribe("esp32One");
      client.subscribe("test/topic");
      
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

