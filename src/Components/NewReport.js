import React, { Component } from 'react';

class NewReport extends Component {
    render() {
        return (
            <div className="container">
                <div className="columns is-centered">
                    <form  className="column is-half" method="post">
                        <div className="field">
                            <label className="label">Kmom number: </label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Report</label>
                            <div className="control">
                                <textarea className="textarea" placeholder="Textarea"></textarea>
                            </div>
                        </div>
                        <div class="control column is-centered">
                            <button class="button is-centered is-link">Submit report</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewReport;