#!/bin/python3.6
# coding: utf-8

# Three arguments available : 
#  --purge : delete all tables
#  --create : create all tables
#  --fill : fill all tables.



import MySQLdb
import sys

db = MySQLdb.connect(host='localhost',user='root',passwd='root',db='airport')
cursor = db.cursor()

if sys.argv[1] == "--purge":
    print("Droping all tables.")
    for e in ['ground_employees', 'cabin_crew_employees', 'pilots_employees', 'aircrafts_fleet', 'routes', 'airports', 'flights', 'departures', 'tickets', 'passengers']:
        drop_query = "drop table "+e+";"
        cursor.execute(drop_query)
    db.commit()
    print("All tables dropped.")

# arg treatments
if sys.argv[1] == "--create":
    print("Starting tables creation.")

    sql0 = """CREATE TABLE if not exists users ( 
    id int(255) UNSIGNED NOT NULL AUTO_INCREMENT, 
    username VARCHAR(20) NOT NULL, 
    is_admin TINYINT(1) NOT NULL, 
    password CHAR(60) NOT NULL, 
    PRIMARY KEY (id), 
    UNIQUE INDEX id_UNIQUE (id ASC), 
    UNIQUE INDEX username_UNIQUE (username ASC)
    );"""

    cursor.execute(sql0)


    sql1 = """ create table if not exists ground_employees (
    ground_employees_id int(11) not null auto_increment,
    surname varchar(255) not null,
    name varchar(255) not null,
    address varchar(255) not null,
    wage int(11) not null,
    post varchar(100) not null,
    social_security_number varchar(20) not null,
    primary key (ground_employees_id)
    );"""

    cursor.execute(sql1)

    sql2 = """ create table if not exists cabin_crew_employees (
    crew_employees_id int(11) not null auto_increment,
    surname varchar(255) not null,
    name varchar(255) not null,
    address varchar(255) not null,
    wage int(11) not null,
    post varchar(100) not null,
    flight_hours int(11) not null,
    social_security_number varchar(20) not null,
    primary key (crew_employees_id)
    );"""

    cursor.execute(sql2)

    sql3 = """ create table if not exists pilots_employees (
    pilots_employees_id int(11) not null auto_increment,
    surname varchar(255) not null,
    name varchar(255) not null,
    address varchar(255) not null,
    wage int(11) not null,
    flight_hours int(11) not null,
    flight_licence varchar(255) not null,
    social_security_number varchar(20) not null,
    primary key (pilots_employees_id)
    );"""

    cursor.execute(sql3)

    sql4 = """ create table if not exists aircrafts_fleet (
    aircraft_id varchar(100) not null,
    aircraft_type varchar(100) not null,
    primary key (aircraft_id)
    );"""

    cursor.execute(sql4)

    sql5 = """ create table if not exists routes (
    route_id int(11) not null auto_increment,
    departure_airport_id int(11) not null,
    arrival_airport_id int(11) not null,
    primary key (route_id)
    );"""

    cursor.execute(sql5)

    sql6 = """ create table if not exists airports (
    airport_id int(11) not null auto_increment,
    name varchar(255) not null,
    code varchar(5) not null,
    city varchar(255) not null,
    primary key (airport_id)
    );"""

    cursor.execute(sql6)

    sql8 = """ create table if not exists flights (
    flight_id int(11) not null auto_increment,
    departure_time time not null,
    arrival_time time not null,
    start_day date not null,
    end_day date not null,
    aircraft_id varchar(100) not null,
    route_id int(11) not null,
    price int(11) not null,
    primary key (flight_id)
    );"""

    cursor.execute(sql8)

    sql9 = """ create table if not exists departures (
    departure_id int(11) not null auto_increment,
    flight_id int(11) not null,
    departure_date date not null,
    pilot_1 int(11) not null,
    pilot_2 int(11),
    crew_1 int(11) not null,
    crew_2 int(11) not null,
    aircraft_capacity int(11) not null,
    taken_seats int(11) not null,
    primary key (departure_id)
    );"""

    cursor.execute(sql9)

    sql10 = """ create table if not exists tickets (
    ticket_id int(11) not null auto_increment,
    price int(11) not null,
    departure_id int(11) not null,
    user_id int(11) not null,
    passenger_id int(11) not null,
    primary key (ticket_id)
    );"""

    cursor.execute(sql10)

    sql11 = """ create table if not exists passengers (
    passenger_id int(11) not null auto_increment,
    name varchar(255) not null,
    surname varchar(255) not null,
    primary key (passenger_id)
    );"""

    cursor.execute(sql11)

    db.commit()
    print("All tables correctly created.")

# next arg treatment
if "--fill" in sys.argv:

    import random as rd
    def social_secu_create():
        num = ""
        for i in range(15):
            num += str(rd.randint(0,9))
        return num

    print("Starting the filling of all tables with information.")


    insert_query1 = """ insert into ground_employees (surname, name, address, wage, post, social_security_number) values
    ('Arthur', 'Machin', '4 Villa Collet, 75014 Paris', 1500,'Signalisation au sol',"""+'"'+social_secu_create()+'"'+"""),
    ('Jean-Baptiste', 'Truc', '12 Rue du Mignot, 69458 Poitier', 1500, 'Signalisation au sol',"""+'"'+social_secu_create()+'"'+"""),
    ('NGuyen', 'Van-Khan', '45 Allée des Oliviers, 25689 Nice', 1500, 'Contrôleur aérien',"""+'"'+social_secu_create()+'"'+"""),
    ('Henrik', 'Ridtet', 'Lieu-dit des Chaumières, 35690 Dole', 2000, 'Responsable sécurité',"""+'"'+social_secu_create()+'"'+"""),
    ('Alfredo', 'Giatardini', 'Palazzo Apostolico Vaticano 00120 Citta del Vaticano', 3000, 'Directeur',"""+'"'+social_secu_create()+'"'+""");"""

    cursor.execute(insert_query1)
    db.commit()

    insert_query2 = """ insert into cabin_crew_employees (surname, name, address, wage, post, flight_hours, social_security_number) values
    ('Alfred', 'Pennyworth', 'Wayne Manor, 75015 Gotham City', 2500,'Steward', 750,"""+'"'+social_secu_create()+'"'+"""),
    ('Clarck', 'Kent', 'Fortress of Solitude, 88888 Krypton', 2500, 'Steward', 748,"""+'"'+social_secu_create()+'"'+"""),
    ('Isabella', 'Fortrana', '15 Via de Sol, 56580 Barcelona', 2500, "Hôtesse de l'air", 1205,"""+'"'+social_secu_create()+'"'+"""),
    ('Yoana', 'Remontada', 'Lieu-dit des Chaumières, 35690 Dole', 2500, "Hôtesse de l'air", 1101,"""+'"'+social_secu_create()+'"'+"""),
    ('Henry', 'TheThird', 'Buckingham-Palace, 25002 Pouilley-Les-Vignes', 3000, 'Commandant de bord', 5258,"""+'"'+social_secu_create()+'"'+"""),
    ('John', 'Smith', 'The White House 1600 Pennsylvania Ave. NW Washington, DC 20500', 3000, 'Commandant de bord', 6124,"""+'"'+social_secu_create()+'"'+""");"""

    cursor.execute(insert_query2)
    db.commit()

    insert_query3 = """ insert into pilots_employees (surname, name, address, wage, flight_hours, flight_licence, social_security_number) values
    ('Michael', 'Jackson', 'NY City - Central Park', 3500, 1000, "10A11","""+'"'+social_secu_create()+'"'+"""),
    ('Thomas', 'Crown', 'Nowhere actually', 3500, 1200, "10A12","""+'"'+social_secu_create()+'"'+"""),
    ('John', 'Ford', '17 Ford Avenue, San Francisco', 4000, 2000, "10A13","""+'"'+social_secu_create()+'"'+"""),
    ('Dimitri', 'Dimitrovitch Soljenitsine', 'Mourmensk - Vladivostok', 4000, 2100, "10A14","""+'"'+social_secu_create()+'"'+"""),
    ('Buck', 'Danny', '12 Rue de Branche, Paris', 5000, 3000, "11A15","""+'"'+social_secu_create()+'"'+""");"""

    cursor.execute(insert_query3)
    db.commit()

    insert_query4 = """ insert into aircrafts_fleet (aircraft_id, aircraft_type) values
    ("F12A14", "airbus A320"),
    ("F12A15", "airbus A320"),
    ("F12A16", "aribus A320"),
    ("G12A14", "airbus A380"),
    ("G12A15", "boeing 747"),
    ("A00A11", "cesna 17"),
    ("CV0000", "Falcon X");"""

    cursor.execute(insert_query4)
    db.commit()

    insert_query5 = """ insert into routes (departure_airport_id, arrival_airport_id) values
    (1,2),(1,3),(2,3),
    (1,4),(2,4),(3,4),
    (1,5),(2,5),(3,5),(4,5),
    (3,1),(3,2),(2,1),
    (4,1),(4,2),(4,3),
    (5,1),(5,2),(5,3),(5,4);"""

    cursor.execute(insert_query5)
    db.commit()

    insert_query6 = """insert into airports (name, code, city) values
    ("Aéroport Charles de Gaulle", "CDG", "Paris"),
    ("Aéroport d'Atlanta", "ATL", "Atlanta"),
    ("Aéroport de Shangai", "SHG", "Shangai"),
    ("Aéroport d'Abidjan", "ABJ", "Abidjan"),
    ("Aéroport de La Paz", "PAZ", "La Paz");"""

    cursor.execute(insert_query6)
    db.commit()

    insert_query8 = """ insert into flights (departure_time, arrival_time, start_day, end_day, aircraft_id, route_id, price) values
    ('12:00:00', '14:00:00', '2018-01-01', '2019-01-01', 'F12A14', 1, 700),
    ('11:00:00', '15:00:00', '2018-01-01', '2019-01-01', 'F12A15', 2, 700),
    ('17:00:00', '19:00:00', '2018-01-01', '2019-01-01', 'F12A16', 3, 700),
    ('22:00:00', '01:00:00', '2018-01-01', '2019-01-01', 'G12A14', 4, 700),
    ('08:00:00', '15:00:00', '2018-01-01', '2019-01-01', 'G12A15', 5, 700),
    ('10:00:00', '21:00:00', '2018-01-01', '2019-01-01', 'A00A11', 6, 700),
    ('11:00:00', '15:00:00', '2018-01-01', '2019-01-01', 'CV0000', 7, 700);"""

    cursor.execute(insert_query8)
    db.commit()


    insert_query9 = """insert into departures (flight_id, departure_date, pilot_1, pilot_2, crew_1, crew_2, aircraft_capacity, taken_seats) values
    (1,"2018-01-01", 1, 2, 1, 2, 700, 1),
    (1,"2018-01-08", 1, 2, 1, 2, 700, 1),
    (1,"2018-01-15", 1, 2, 1, 2, 700, 1),
    (2,"2018-01-01", 3, 4, 3, 4, 700, 1),
    (2,"2018-01-08", 3, 4, 3, 4, 700, 1),
    (2,"2018-01-15", 3, 4, 3, 4, 700, 1),
    (3,"2018-01-01", 4, 5, 5, 6, 700, 1),
    (3,"2018-01-08", 4, 5, 5, 6, 700, 1),
    (3,"2018-01-15", 4, 5, 5, 6, 700, 1);"""

    cursor.execute(insert_query9)
    db.commit()

    insert_query10 = """ insert into tickets (price, departure_id, user_id, passenger_id) values
    (150,1,1, 1),(200,1,1, 2),(200,1,1, 3),
    (200,2,1, 4),(250,2,1, 5),
    (300,3,1, 6);"""

    cursor.execute(insert_query10)
    db.commit()

    insert_query11 = """insert into passengers (name, surname) values
    ("Jo", "Baz"),
    ("John", "Bazaz"),
    ("Johnny", "Barough"),
    ("Frank", "Sinatra"),
    ("Franky", "Vodoo"),
    ("Franco", "Francesco");"""

    cursor.execute(insert_query11)
    db.commit()

    print("All data correctly inserted into database airport tables.")