from flask import Blueprint, render_template, request
from flaskr.db import get_db

auth = Blueprint('auth', __name__)

@auth.route('/', methods=('GET', 'POST'))
def entry():
   if request.method == 'POST':
      first_name = request.form.get('first_name', None)
      last_name = request.form.get('last_name', None)
      temperature = request.form.get('temperature', None)
      temperature_unit = request.form.get('temperatureUnit')
      flagStatus = request.form.get('flag_status')
      db = get_db()
      error = None

      if temperature == "":
         error = 'Temperature is required'
         raise Exception(error)
      elif not first_name:
         error = 'First Name is required'
         raise Exception(error)
      elif not last_name:
         error = 'Last Name is required'
         raise Exception(error)
      if error is None:
         try:
            if flagStatus == 'false':
               db.execute(
                  "INSERT INTO entries (first_name, last_name, temperature, unit) VALUES(?, ?, ?, ?)",
                  (first_name, last_name, temperature, temperature_unit) 
               )
               db.commit()
         except Exception as e:
            print(f"Error: {e}")

   return render_template('index.html', boolean=True)
