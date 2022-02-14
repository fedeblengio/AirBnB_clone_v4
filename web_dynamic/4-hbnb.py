#!/usr/bin/python3
"""
flask for html
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid


# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False
port = 5000
host = '0.0.0.0'


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    calls .close() (i.e. .remove()) on the current SQLAlchemy Session
    """
    storage.close()


@app.route('/4-hbnb/')
def hbnb_filters(the_id=None):
    """
    handles request to custom template
    """
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amenities = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())
    return render_template('4-hbnb.html',
                           amenities=amenities,
                           states=states,
                           places=places,
                           users=users,
                           cache_id=uuid.uuid4())


if __name__ == "__main__":
    app.run(host=host, port=port)
