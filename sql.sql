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
	Email varchar(50) not null primary key,
	Adresse_livraison varchar(50) not null,
);

create table commande(
	Id int auto_increment primary key,
	Date date,
	Statut varchar(10) not null,
	Prix_total int,
	Email_client varchar(50),
	foreign key (Email_client) references client(Email)
);

create table categorie(
	Id int auto_increment primary key,
	Nom varchar(20) not null
);

create table produit(
	Id int auto_increment primary key,
	Nom varchar(20) not null,
	Description varchar(100),
	Ingredient varchar(100),
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