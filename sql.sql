create database Mycookies

drop table contient;
drop table produit;
drop table commande;
drop table categorie;
drop table client;

create table client(
	Nom varchar(20),
	Prenom varchar(20),
	MDP varchar(20) not null,
	Email varchar(50) not null,
	Adresse_livraison varchar(50) not null,
	primary key (Nom,Prenom)
);

create table commande(
	Id int auto_increment primary key,
	Date date,
	Statut varchar(10) not null,
	Montant_total int,
	Nom_client varchar(20),
	Prenom_client varchar(20),
	foreign key (Nom_client, Prenom_client) references client(Nom, Prenom)
);

create table categorie(
	Id int auto_increment primary key,
	Nom varchar(20) not null
);

create table produit(
	Id int auto_increment primary key,
	Nom varchar(20) not null,
	Description varchar(100),
	Prix int not null,
	Stock tinyint not null,
	ID_categorie int,
	foreign key (Id_categorie) references categorie(Id)
);

create table contient(
	Id_commande int,
	Id_produit int,
	primary key (Id_commande,Id_produit),
	foreign key (Id_commande) references commande(Id),
	foreign key (Id_produit) references produit(Id)
);