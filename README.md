![Fuellytics logo](./assets/logos/fuellytics-high-resolution-logo-color-on-transparent-background.png "Fuellytics")
---

# TODO

- [ ] For Waika cause I don't want to mess up your beautiful frontend code: Use `rotation` from `expo-sensors`'s `DeviceMotion` class to send device orientation information to the backend: [see here](https://docs.expo.dev/versions/v47.0.0/sdk/devicemotion/#devicemotionmeasurement).

# How to run the backend

Go to the backend directory:

```
cd backend
```

If this is you first time running the project, create an .myEnv file

```
python -m venv .myEnv
```

To activate the env:

```
source .myEnv/bin/activate
```

If you need to install dependencies

```
pip install -r requirements.txt
```

To run the project:

```
flask run
```

# How to run the frontend

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
