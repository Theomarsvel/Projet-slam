
insert into client (Nom, Prenom, MDP, Email, Adresse_livraison) values
('Martin',   'Lucas',   'lucas2024',   'lucas.martin@mail.fr',   '12 rue des Alpes, 38000 Grenoble'),
('Bernard',  'Emma',    'emma_cookie', 'emma.bernard@mail.fr',   '5 avenue Jean Jaurès, 38100 Grenoble'),
('Dubois',   'Hugo',    'hugo38',      'hugo.dubois@mail.fr',    '27 cours Berriat, 38000 Grenoble'),
('Thomas',   'Léa',     'lea12345',    'lea.thomas@mail.fr',     '8 rue Lesdiguières, 38000 Grenoble'),
('Robert',   'Louis',   'louis_r',     'louis.robert@mail.fr',   '3 place Grenette, 38000 Grenoble');

insert into categorie (Nom) values
('Classiques'),   
('Chocolat'),     
('Fruités'),     
('Vegan'),        
('Spéciaux');     

insert into produit (Nom, Description, Ingredient, Prix, Stock, ID_categorie) values
('Cookie Classique',    'Le cookie traditionnel, moelleux et doré',            'Farine, beurre, sucre, oeufs, vanille',                     3, 100, 1),
('Cookie Pépites',      'Cookie généreux aux pépites de chocolat noir',        'Farine, beurre, sucre, oeufs, pépites de chocolat noir',    4,  80, 2),
('Double Chocolat',     'Pâte au cacao et pépites de chocolat au lait',        'Farine, cacao, beurre, sucre, oeufs, chocolat au lait',     4,  60, 2),
('Cookie Framboise',    'Cookie fondant avec morceaux de framboise',           'Farine, beurre, sucre, oeufs, framboises, chocolat blanc',  5,  40, 3),
('Cookie Cranberry',    'Cookie aux cranberries et à l''orange',               'Farine, beurre, sucre, oeufs, cranberries, zeste d''orange',5,  35, 3),
('Cookie Vegan Avoine', 'Cookie 100% végétal aux flocons d''avoine',           'Farine, flocons d''avoine, huile de coco, sucre de canne',  4,  50, 4),
('Cookie Caramel',      'Coeur coulant au caramel au beurre salé',             'Farine, beurre, sucre, oeufs, caramel, fleur de sel',       5,  25, 5),
('Cookie Noisette',     'Cookie croquant aux éclats de noisette',              'Farine, beurre, sucre, oeufs, noisettes, chocolat noir',    4,  45, 5);

insert into commande (Date, Statut, Prix_total, Email_client) values
('2026-09-12', 'Livrée',   7,  'lucas.martin@mail.fr'),   
('2026-09-20', 'Livrée',   14, 'emma.bernard@mail.fr'),   
('2026-09-28', 'Expédiée', 4,  'hugo.dubois@mail.fr'),    
('2026-10-03', 'En cours', 13, 'lea.thomas@mail.fr'),     
('2026-10-06', 'En cours', 7,  'louis.robert@mail.fr'),  
('2026-10-07', 'Annulée',  5,  'lucas.martin@mail.fr');   

insert into contient (Id_commande, Id_produit) values
(1, 1), (1, 2),            
(2, 3), (2, 4), (2, 5),    
(3, 6),                    
(4, 2), (4, 7), (4, 8),    
(5, 1), (5, 3),            
(6, 4);                    