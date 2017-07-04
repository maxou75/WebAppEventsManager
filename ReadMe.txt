1) Installer Python.

2) Installer Django (voir tuto : https://openclassrooms.com/courses/developpez-votre-site-web-avec-le-framework-django/creez-vos-applications-web-avec-django). 

3) Installer MongoDB. Cr�er une base de donn�es qui, dans le projet, s'apelle 'myDatabase'.

4) R�cuperer le code source du projet. L'ouvrir dans un IDE (de pr�f�rence PyCharm). 

5) Lire le rapport et les tutos Django utilisant services REST pour comprendre le code et la s�gmentation des fichiers.

6) D�marrer le serveur du projet.

6) Dans un navigateur, aller sur http://localhost:8000/ pour acc�der � l'application.

Notes: - Les types d'�venement (model 'Type') sont � ins�rer par le d�veloppeur depuis un terminal "� la main" dans une collection 'type' dans la base de donn�es 'myDatabase' de MongoDB.
       - Pour que l'application puisse acc�der � Facebook, il faut d'abord avoir un compte d�veloppeur Facebook et renseigner l'application. On r�cup�re ainsi un appId � renseigner lors de la r�cup�ration.
	 De plus, pour que l'utilisateur autorise l'application en phase de d�veloppement � acc�der � ses differentes informations (ici ses events), il faut passer par l'API Graph FB (https://developers.facebook.com/tools/explorer/).