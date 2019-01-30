import os
import sys
import mysql.connector
import os.path

scan_path = sys.argv[1]
base_path = sys.argv[2]

mydb = mysql.connector.connect(
  host = "localhost",
  port = "3307",
  user = "pengli",
  passwd = "password",
  db = "media",
  auth_plugin='mysql_native_password'
)

cur = mydb.cursor()
sql = ("INSERT INTO PHOTOS (NAME) VALUES (%(name)s)")

for root, dirs, files in os.walk(scan_path):
    for name in files:
        if name.startswith('.'):
            continue
        print("=================")
        print(os.path.join(root, name))
        print(name)

        if not os.path.isfile(base_path + "/'" + name + "'"):
            os.system("ln -s '" + os.path.join(root, name) + "' " + base_path + "/'" + name + "'")
            val = { "name": name}
            cur.execute(sql, val)


mydb.commit()
cur.execute(sql, val)
mydb.commit()



mydb.close()