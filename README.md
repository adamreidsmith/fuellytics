![Fuellytics logo](./assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background.png "Fuellytics")
---
## Description
Fuellytics is a mobile application aiming to raise people’s awareness of climate change by providing services for users to interactively track fuel consumption and gas emissions as well as report historical data.
To develop this application, open dataset from Fuel Economy API, Engine displacement, and super changer API as well as live data set from users’ phone are used to perform fuel consumption and gas emission analysis. Moreover, the app also records each trip report for users to gain more vehicle and environmental insights.

## Demo
View our presentation of Fuellytics [here](https://www.youtube.com/watch?v=2h5kqD_IYdg).

## File descriptions
This Github repository contains the frontend part of the application. For `frontend` folder, [React Native](https://reactnative.dev/) is used to develop the mobile app frontend which has four main features: User authentication, Car profile, Fuel consumption and gas emission real-time tracking as well as Trip report. Speaking about the backend, there are two more repositories for this part which are [fuellytics_backend](https://github.com/wongsitu/fuellytics_backend) for handling all features provided by the app and [imu-mechanization-websocket](https://github.com/wongsitu/imu-mechanization-websocket) for real-time fuel consumption and gas emission tracking analysis feature. Other folders relate to the project. In `assets/logos` folder, there are application logo designs while `report` folder stores the project report.


## How to run the frontend

Go to the frontend directory:

```
cd frontend
```

If you need to install dependencies

```
npm install
```

To run the project:

```
npm run start
```
