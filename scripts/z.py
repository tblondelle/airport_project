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

drop_query = """ 
SELECT 
DISTINCT    tickets.ticket_id,
    tickets.price, 
    departures.departure_date,
    flights.departure_time,
    flights.arrival_time,
    passengers.surname,
    passengers.name,
    routes.departure_airport_id,
    routes.arrival_airport_id
FROM 
    tickets JOIN
    passengers JOIN
    departures JOIN
    flights JOIN
    routes
WHERE
    user_id = 1 AND
    ticket_id = 1
;"""


drop_query2 = """ 
SELECT 
    tickets.ticket_id,
    tickets.price,
    passengers.surname,
    passengers.name,
    departures.departure_date,
    flights.departure_time,
    flights.arrival_time,
    (SELECT city FROM airports WHERE airports.airport_id = routes.departure_airport_id) AS start_city,
    (SELECT city FROM airports WHERE airports.airport_id = routes.arrival_airport_id) AS end_city,
    aircrafts_fleet.aircraft_type
FROM 
    tickets 
    LEFT JOIN passengers ON tickets.passenger_id = passengers.passenger_id
    LEFT JOIN departures ON tickets.departure_id = departures.departure_id
    LEFT JOIN flights ON flights.flight_id = departures.flight_id, 
    routes,
    aircrafts_fleet
WHERE
    user_id = 1 AND
    flights.route_id = routes.route_id AND
    aircrafts_fleet.aircraft_id = flights.aircraft_id
;"""

cursor.execute(drop_query2)

result = cursor.fetchall()

for i in result:
    print(i)
    input('continue')

