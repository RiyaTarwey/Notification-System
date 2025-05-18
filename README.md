# Notification System

This project is a scalable and high-throughput notification system built with Node.js and TypeScript. It uses Kafka for handling high-throughput message processing and BullMQ for prioritizing and processing jobs.

## Features

- **High Throughput**: Kafka is used to manage high volumes of notification requests.
- **Job Prioritization**: BullMQ manages the processing of notifications based on job priority.
- **Scalability**: Kafka and BullMQ ensure the system can handle large numbers of notifications with efficient resource management.

## Technologies

- **Node.js**: Backend runtime for executing JavaScript/TypeScript.
- **TypeScript**: Type-safe language for building maintainable code.
- **Kafka**: Distributed message broker used for managing notifications.
- **BullMQ**: Queue manager for prioritizing jobs.
- **Redis**: Used by BullMQ for queue management.

## System Architecture

1. **Notification API**: Users call the API to send a notification. This API accepts the notification request and produces a job message to Kafka.
2. **Kafka**: Kafka is used as a distributed message broker that handles high-throughput notification jobs. It ensures that each notification request is reliably published to a relevant topic.
3. **Consumers**: Kafka consumers listen to specific topics and retrieve the notification jobs from Kafka.
4. **BullMQ**: The jobs retrieved by Kafka consumers are then handed over to BullMQ, where jobs are processed based on priority (e.g., high-priority notifications are processed first).
5. **Notification Handling**: BullMQ processes the jobs, and notifications are sent according to the type of job (email, SMS, push notification, etc.).

## Setup Instructions

### Prerequisites

- **Node.js** (version >= 18)
- **Kafka** (running instance)
- **Redis** (required by BullMQ)
- **MongoDB** (optional for storing notification data)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/notification-system.git
   cd notification-system
2. Install dependencies:
   ```bash
   npm install
3. Copy the example environment file:
   ```bash
   cp .env.example .env
4. Configure the .env file with your settings (replace the placeholder values with actual details):
   ```bash
    APPNAME=notification-system
    PORT=4000
    DATABASE_DIALECT=postgres
    SESSION_SECRET=your_session_secret_here
    JWT_SECRET_KEY=your_jwt_secret_key_here
    SERVICE=Gmail
    HOST=smtp.gmail.com
    SMTP_PORT=465
    SECURE=SSL
    SMTP_USER=your_smtp_user_here
    SMTP_PASSWORD=your_smtp_password_here
    MONGO_URI=mongodb://localhost:27017/NotificationSystemDesign_Dev
    BASEURL=localhost:9092
    KAFKABASEURL=localhost:9092
    HASH_ALGORITHM=your_algorithm_name
    HASH_PASS=your_hash_passphrase_here
    HASH_SALT=your_hash_salt_here
5. Start Kafka and Redis services using Docker:
   ```bash
   docker run -d -p 2181:2181 zookeeper
   docker run -d -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<Zookeeper_ip>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<kafka_ip>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
   sudo docker run --name redis -p 6379:6379 -d redis
6. Start the server:
   ```bash
   npx nodemon


Now this project is ready to use and for developement on you local machine

**Note**: If you have any query or any question fell free rais it into issues section
# Notification-System
