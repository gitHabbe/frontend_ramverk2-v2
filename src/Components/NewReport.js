import React, { Component } from 'react';

class NewReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kmomNum: "",
            report: ""
        }
    }
    
    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.kmomNum);
        
        console.log("Submitted");
    }

    render() {
        return (
            <div className="container">
                <div className="columns is-centered">
                    <form  className="column is-half" method="post">
                        <div className="field">
                            <label className="label">Kmom number: </label>
                            <div className="control">
                                <input onChange={this.onChange.bind(this)} className="input" name="kmomNum" type="text" placeholder="Kmom #" />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Report</label>
                            <div className="control">
                                <textarea onChange={this.onChange.bind(this)} name="report" className="textarea" placeholder="Report text"></textarea>
                            </div>
                        </div>
                        <div class="control column is-centered">
                            <button
                                onClick={this.onSubmit.bind(this)}
                                class="button is-centered is-link">
                                Submit report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default NewReport;