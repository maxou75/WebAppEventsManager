# Events manager Web app sample

## Description
This Web application is using Django Python framework on backend. It is working with a local MongoDB database.
It allows to create or retrieves events data. It is also using Facebook API to connect and get events thought FB user account. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

You will need to dispose of a computer with Python and Django installed. All the external modules are located in 'venv/Lib/site-packages/'.
You will also need to have MongoDB installed.
The easiest way to run the server is to install PyCharm IDE.

### Run the server
* Download the source code from GitHub.
* Run the MongoDB service and open MongoDB console (by default MongoDB is running locally on port 27017).
* On MongoDB console, create a database named 'myDatabase' and under, a collection named 'type'. Insert at least one type with a custom 'name' value.
* Launch PyCharm and select File > Open ...
* Navigate to the root path of the downloaded project and validate.
* On the top bar, press Run 'Django' button.
* Open a browser and access the link http://localhost:8000/ (Facebook API won't work with 127.0.0.1).

### Usage
* On the main page, you can connect your Facebook account, create or find events by name, description or location.
* If you are connected, you can access your profile page by clicking on 'Voir mon profil' button.
* On the event manager page, you have to specify all the events values. If your Facebook account is linked, you can also directly import events.
* The search bar will search all events which name, description or location match the input regex.
* You can see event details page after a search by clicking on 'Voir' button.

This personal project was for me the opportunity to learn Python and Django framework, to handle MongoDB and the Facebook API.

Moreover, there are many features that are not finished or could be added : user location finding with Google API, user manager page, better events search, etc.

Finally, I was mainly focus on the backend side and it is why I implemented a basic frontend logic and design.

## Authors

* **Maxime DONNET** - *Initial work* - [Web app Events Manager Sample](https://github.com/maxou75/web_events_manager_sample)
* **January 2017**
