# AwsKinesisHandler

AwsKinesisHandler is an application designed to process and manage user limit events from AWS Kinesis streams. It handles various types of events such as user limit creation, reset, and progress changes, storing the data in-memory. The application is built using Node.js and TypeScript, and can be easily deployed using Docker for streamlined setup and execution.

## Running with Docker

Before you begin, ensure that Docker is installed on your system and the Docker daemon is running. Then:

1. Build the Docker image: `docker build -t aws-kinesis-handler .`
2. Run the Docker container: `docker run aws-kinesis-handler`

## Project Structure

- `src/index.ts`: Entry point of the application
- `src/commands/`: Contains command handlers for different user limit events
- `src/repositories/`: Includes the user limit repository implementation
- `src/services/`: Contains the UserLimitEventService for handling different event types
- `src/types/`: Defines TypeScript interfaces and types used throughout the project

## Features

- Handles USER_LIMIT_CREATED events
- Processes USER_LIMIT_RESET events
- Manages USER_LIMIT_PROGRESS_CHANGED events
- In-memory storage of user limits

## Technologies Used

- Node.js
- TypeScript
- Docker
- AWS Kinesis (for event streaming)

## Questions and Answers

1. What did you like about the task and what didn't? Can we improve it and how?

I appreciated the opportunity to get to know AWS Kinesis and to try and impolement handler for managing events specific to projects your company is working on. The event-driven architecture is an interesting and modern way to structure systems.

The task provided a good balance of practical implementation and architectural considerations. Working with different event types allowed for a comprehensive exploration of event handling in a real-world scenario.

To improve the task, we could consider adding error handling for edge cases like missing or invalid event data could make the task even more robust and realistic.

Furthermore, it would be beneficial to describe the constraints that need to be implemented when modifying data in the database during specific events. This would provide a clearer understanding of the business rules and data integrity requirements, ensuring that the implementation accurately reflects real-world scenarios and maintains data consistency across different event types.

2. If you were asked to change it so the `UserLimit` entries are stored on a database with a primary goal to provide them back to the front-end for display, which one would you suggest and why? What sub-tasks would be involved in this change?

For storing `UserLimit` entries in a database with the goal of displaying them in the front-end, I would suggest using MongoDB. Here's why:

- MongoDB's document-based structure aligns well with the JSON-like structure of our `UserLimit` objects.
- It offers good performance for read operations, which is crucial for front-end display.
- MongoDB provides good scalability, which is important if the number of user limits grows significantly.

Sub-tasks involved in this change:

a. Set up a MongoDB database and establish a connection from the application.
b. Create a MongoDB schema for the `UserLimit` model.
c. Switch repository pattern classes to use different interface implementation(to use MongoDB operations instead of in-memory storage).
d. Implement pagination and sorting in the repository for efficient data retrieval.
e. Create new API endpoints for fetching user limits for front-end display.
f. Implement caching mechanisms to optimize frequent read operations.
g. Add database migration scripts for future schema changes.
h. Implement proper error handling and logging for database operations.
