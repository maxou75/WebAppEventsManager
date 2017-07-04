1) Installer Python.

2) Installer Django (voir tuto : https://openclassrooms.com/courses/developpez-votre-site-web-avec-le-framework-django/creez-vos-applications-web-avec-django). 

3) Installer MongoDB. Créer une base de données qui, dans le projet, s'apelle 'myDatabase'.

4) Récuperer le code source du projet. L'ouvrir dans un IDE (de préférence PyCharm). 

5) Lire le rapport et les tutos Django utilisant services REST pour comprendre le code et la ségmentation des fichiers.

6) Démarrer le serveur du projet.

6) Dans un navigateur, aller sur http://localhost:8000/ pour accèder à l'application.

Notes: - Les types d'évenement (model 'Type') sont à insérer par le développeur depuis un terminal "à la main" dans une collection 'type' dans la base de données 'myDatabase' de MongoDB.
       - Pour que l'application puisse accèder à Facebook, il faut d'abord avoir un compte développeur Facebook et renseigner l'application. On récupère ainsi un appId à renseigner lors de la récupération.
	 De plus, pour que l'utilisateur autorise l'application en phase de développement à accèder à ses differentes informations (ici ses events), il faut passer par l'API Graph FB (https://developers.facebook.com/tools/explorer/).