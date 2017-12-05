#!/bin/python3.6

import MySQLdb
import sys


# arg treatments
if sys.argv[1] == "--create":
    print("Starting database and tables creation.")

    db = MySQLdb.connect(host='localhost',user='root',passwd='root',db='airport')
    cursor = db.cursor()

    sql1 = """ create table if not exists ground_employees (
    ground_employees_id int(11) not null auto_increment,
    surname varchar(255) not null,
    name varchar(255) not null,
    address varchar(255) not null,
    wage int(11) not null,
    social_security_number varchar(255) not null,
    primary key (ground_employees_id)
    );"""

    cursor.execute(sql1)


    sql2 = """ create table if not exists cabin_crew_employees (
    crew_employees_id int(11) not null auto_increment,
    surname varchar(255) not null,
    name varchar(255) not null,
    address varchar(255) not null,
    wage int(11) not null,
    post varchar(63) not null,
    flight_hours int(11) not null,
    social_security_number varchar(255) not null,
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
    social_security_number varchar(255) not null,
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
    airport_id int(11) not null,
    name varchar(255) not null,
    code varchar(5) not null,
    city varchar(255) not null,
    primary key (airport_id)
    );"""

    cursor.execute(sql6)

    sql8 = """ create table if not exists flights (
    flight_number int(11) not null auto_increment,
    departure_time time not null,
    arrival_time time not null,
    start_day date not null,
    end_day date not null,
    aircraft_id int(11) not null,
    route_id int(11) not null,
    primary key (flight_number)
    );"""

    cursor.execute(sql8)

    sql9 = """ create table if not exists departures (
    flight_number int(11) not null,
    departure_datetime datetime not null,
    pilot_1 int(11) not null,
    pilot_2 int(11),
    crew_1 int(11) not null,
    crew_2 int(11) not null,
    aircraft_capacity int(11) not null,
    taken_seats int(11) not null
    );"""

    cursor.execute(sql9)

    sql10 = """ create table if not exists tickets (
    ticket_id int(11) not null auto_increment,
    price int(11) not null,
    departure_id int(11) not null,
    client_id int(11) not null,
    primary key (ticket_id)
    );"""

    cursor.execute(sql10)

    sql11 = """ create table if not exists passengers (
    passenger_id int(11) not null auto_increment,
    name varchar(255) not null,
    surname varchar(255) not null,
    ticket_id int(11) not null,
    primary key (passenger_id)
    );"""

    cursor.execute(sql11)
