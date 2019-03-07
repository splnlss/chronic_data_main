import React from 'react';
import './dashboard.css';

export default class AddVitals extends React.Component {

    onSubmit(event) {
        event.preventDefault();
    }
    render() {
    return (
        <main>
          <div className="form">
            <form className="card add-vitals" onSubmit={e => this.onSubmit(e)}>
                <li>
                  <ul>
                    <label>Blood Pressure:
                        <input type="text" name="bloodPressure" />
                    </label>
                  </ul>
                  <ul>
                    <label>Heart Rate:
                        <input type="text" name="heartRate" />
                    </label>
                  </ul>
                  <ul>
                    <label>Weight:
                        <input type="text" name="weight" />
                    </label>
                  </ul>
                </li>
                <button>Add</button>
                <button type="button">
                    Cancel
                </button>
            </form>
          </div>
        </main>
        );
    }
}
